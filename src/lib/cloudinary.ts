export interface CloudinaryUploadResult {
  success: boolean;
  url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}

/**
 * Uploads a file (File object or Base64 string) to Cloudinary via backend Express API
 */
export async function uploadImageToCloudinary(
  fileOrBase64: File | string,
  folder: string = 'sakura_high_school',
  title: string = 'Uploaded Media'
): Promise<CloudinaryUploadResult> {
  let base64Data = '';

  if (typeof fileOrBase64 === 'string') {
    base64Data = fileOrBase64;
  } else {
    // Read File as Data URL
    base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
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

  const data = await response.json();
  return data;
}
