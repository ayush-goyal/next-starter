import { env } from "@/env";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type ReadableStream } from "stream/web";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_R2_ENDPOINT ?? "",
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "",
  },
});

export async function uploadToR2(
  key: string,
  body: ReadableStream<any>,
  mimeType: string,
) {
  const chunks: Buffer[] = [];
  for await (const chunk of body) {
    chunks.push(Buffer.from(chunk));
  }
  const uploadBody = Buffer.concat(chunks);

  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME ?? "",
    Key: key,
    Body: uploadBody,
    ContentType: mimeType,
  });

  await r2Client.send(command);

  // Write storage file to database here and return id

  return "photo-id";
}

export async function getPresignedUrl(storageKey: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME ?? "",
    Key: storageKey,
  });

  return getSignedUrl(r2Client, command, { expiresIn: 60 * 60 * 2 }); // 2 hour expiry
}
