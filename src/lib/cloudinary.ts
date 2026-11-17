export interface CloudinaryUploadResult {
  success: boolean;
  url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}

export interface CloudinaryConfigStatus {
  status: string;
  cloudName: string;
  isConfigured: boolean;
}

const MAX_FILE_SIZE_BYTES = 14 * 1024 * 1024; // Keeps base64 JSON payload safely under 20MB limit

export function getPublicCloudinaryCloudName(): string {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return metaEnv?.VITE_CLOUDINARY_CLOUD_NAME || '';
}

export async function getCloudinaryConfig(): Promise<CloudinaryConfigStatus> {
  try {
    const response = await fetch('/api/cloudinary-config');
    if (!response.ok) {
      return {
        status: 'error',
        cloudName: getPublicCloudinaryCloudName(),
        isConfigured: false,
      };
    }
    return (await response.json()) as CloudinaryConfigStatus;
  } catch {
    return {
      status: 'offline',
      cloudName: getPublicCloudinaryCloudName(),
      isConfigured: false,
    };
  }
}

/**
 * Uploads a file (File object or Base64 string) to Cloudinary via backend Express API
 */
export async function uploadImageToCloudinary(
  fileOrBase64: File | string,
  folder: string = 'ccn_university',
  title: string = 'CCNUST Campus Media'
): Promise<CloudinaryUploadResult> {
  let base64Data = '';

  if (typeof fileOrBase64 === 'string') {
    base64Data = fileOrBase64;
  } else {
    if (!fileOrBase64.type.startsWith('image/')) {
      throw new Error('Please choose a valid image file (JPG, PNG, WEBP, or GIF).');
    }
    if (fileOrBase64.size > MAX_FILE_SIZE_BYTES) {
      throw new Error('Image must be 14 MB or smaller for upload.');
    }

    // Read File as Data URL
    base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Could not read the selected image file.'));
      reader.readAsDataURL(fileOrBase64);
    });
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: base64Data,
      folder,
      title,
    }),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(errJson.error || errJson.details || 'Failed to upload image to Cloudinary');
  }

  return (await response.json()) as CloudinaryUploadResult;
}

