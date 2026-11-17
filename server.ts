import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

// Configure Cloudinary & server-side Gemini readiness solely from environment variables (never hardcode secrets)
const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);
const isGeminiConfigured = Boolean(geminiApiKey);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

function resolvePort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const parsed = parseInt(process.argv[portArgIndex + 1], 10);
    if (!Number.isNaN(parsed)) return parsed;
  }

  const eqArg = process.argv.find((arg) => arg.startsWith('--port='));
  if (eqArg) {
    const parsed = parseInt(eqArg.split('=')[1], 10);
    if (!Number.isNaN(parsed)) return parsed;
  }

  if (process.env.NODE_ENV === 'production' && process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }

  return 3000;
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = resolvePort();

  // Gzip compression for all text/JSON/JS/CSS responses
  app.use(compression());

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Security & concurrency friendly headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  // Serve static assets from public/ folder in all modes with HTTP caching
  app.use(express.static(path.join(process.cwd(), 'public'), {
    maxAge: '1d',
    etag: true,
    lastModified: true,
  }));

  // Internal control plane, dev status, and health endpoints
  app.get(
    [
      '/health',
      '/healthz',
      '/_health',
      '/api/health',
      '/__aistudio_internal_control_plane/dev/status',
    ],
    (_req, res) => {
      res.json({
        status: 'ok',
        ready: true,
        services: {
          cloudinaryConfigured: isCloudinaryConfigured,
          geminiConfigured: isGeminiConfigured,
        },
        timestamp: new Date().toISOString(),
      });
    }
  );

  app.get('/api/cloudinary-config', (_req, res) => {
    res.json({
      status: 'ok',
      cloudName,
      isConfigured: isCloudinaryConfigured,
    });
  });

  // API Route: Cloudinary Image Upload
  app.post('/api/upload', async (req, res) => {
    try {
      if (!isCloudinaryConfigured) {
        return res.status(503).json({
          error: 'Media upload service is not configured in this environment.',
        });
      }

      const { image, folder, title } = req.body ?? {};
      const targetFolder =
        typeof folder === 'string' && folder.trim() ? folder.trim() : 'ccn_university';

      if (typeof image !== 'string' || !image.trim()) {
        return res.status(400).json({ error: 'No valid image data provided' });
      }

      const sanitizedTitle =
        typeof title === 'string' && title.trim()
          ? title.trim().replace(/[|=]/g, ' ')
          : undefined;

      const result = await cloudinary.uploader.upload(image, {
        folder: targetFolder,
        resource_type: 'auto',
        tags: ['ccn_university', targetFolder],
        ...(sanitizedTitle ? { context: `caption=${sanitizedTitle}` } : {}),
      });

      return res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        createdAt: result.created_at,
      });
    } catch (error: unknown) {
      const details = error instanceof Error ? error.message : String(error);
      console.error('Cloudinary upload error:', details);
      return res.status(500).json({
        error: 'Cloudinary upload failed',
        details,
      });
    }
  });

  let viteServer: { close: () => Promise<void>; middlewares: express.RequestHandler } | null = null;

  // Vite middleware setup (Dynamic import for development mode to avoid ERR_REQUIRE_ESM in production)
  if (process.env.NODE_ENV !== 'production') {
    const viteReady = (async () => {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
        },
        appType: 'spa',
      });
      viteServer = vite;
      return vite;
    })();

    app.use(async (req, res, next) => {
      try {
        const vite = await viteReady;
        vite.middlewares(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Cache immutable versioned assets for 1 year
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }));
    // Static files (favicon, etc.)
    app.use(express.static(distPath, {
      maxAge: '1h',
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Tune socket keep-alive & request timeouts for concurrent multi-user load
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;
  httpServer.requestTimeout = 30000;

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🏛️ CCNUST Server running on http://0.0.0.0:${PORT}`);
  });

  const shutdown = async () => {
    if (viteServer) {
      await viteServer.close().catch(() => {});
    }
    httpServer.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 2000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
