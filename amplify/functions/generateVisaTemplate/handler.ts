import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    const { templateData, templateName } = event;

    if (!templateData || !templateName) {
      throw new Error('Missing templateData or templateName in event');
    }

    const uploadParams = new PutObjectCommand({
      Bucket: process.env.PDF_BUCKET,
      Key: templateName,
      Body: templateData,
      ContentType: 'application/pdf',
    });

    await s3Client.send(uploadParams);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Visa template uploaded successfully' }),
    };
} catch (error) {
    const err = error as Error; // Explicitly type the error
    console.error('Error updating visa status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
