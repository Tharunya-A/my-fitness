import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { env } from './env.config.js';

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const S3_BUCKET = env.AWS_S3_BUCKET_NAME;

export const uploadPdfToS3 = async ({ key, body, contentType }) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
};

export const getObjectStream = async (key) => {
  const result = await s3Client.send(
    new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    })
  );

  return result.Body;
};