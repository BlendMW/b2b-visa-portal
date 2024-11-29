import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    const { reportContent, reportName } = event;

    if (!reportContent || !reportName) {
      throw new Error('Missing reportContent or reportName in event');
    }

    const uploadParams = new PutObjectCommand({
      Bucket: process.env.REPORT_BUCKET,
      Key: reportName,
      Body: reportContent,
      ContentType: 'application/pdf',
    });

    await s3Client.send(uploadParams);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Report generated and uploaded successfully' }),
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
