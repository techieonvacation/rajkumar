"use server";

import { auth } from "@/auth";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  isCloudinaryConfigured,
  signParams,
  uploadEndpoint,
} from "@/lib/cloudinary";

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function createUploadSignature(
  subfolder?: string
): Promise<UploadSignature> {
  await requireAdmin();

  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your environment."
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = subfolder
    ? `${CLOUDINARY_FOLDER}/${subfolder}`
    : CLOUDINARY_FOLDER;
  const signature = signParams({ folder, timestamp });

  return {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder,
  };
}

export interface UploadResult {
  url: string;
  publicId?: string;
  width?: number;
  height?: number;
}

export async function uploadFromUrl(
  url: string,
  subfolder?: string
): Promise<UploadResult> {
  await requireAdmin();

  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error("Enter a valid http(s) image URL.");
  }

  if (!isCloudinaryConfigured()) {
    return { url: trimmed };
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = subfolder
    ? `${CLOUDINARY_FOLDER}/${subfolder}`
    : CLOUDINARY_FOLDER;
  const signature = signParams({ folder, timestamp });

  const body = new URLSearchParams({
    file: trimmed,
    api_key: CLOUDINARY_API_KEY,
    timestamp: String(timestamp),
    folder,
    signature,
  });

  const res = await fetch(uploadEndpoint("image"), {
    method: "POST",
    body,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Cloudinary import failed: ${detail || res.statusText}`);
  }

  const data = (await res.json()) as {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
  };

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
}
