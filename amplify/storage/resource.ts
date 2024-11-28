import { defineStorage } from '@aws-amplify/backend';

// Define S3 bucket for file storage
export const storage = ({
  bucketName: 'visa-system-storage',
  access: {
    grantRead: ['owner'],
    grantWrite: ['owner'],
  },
  corsPolicy: {
    allowedOrigins: ['*'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['*'],
  },
  visaTemplates: {
    bucketName: 'visa-templates', // Bucket for auto-generated PDFs
    access: {
      read: ['owner'], // Owner can download their visa
      write: ['system'], // Only the system can write PDFs
    },
    corsPolicy: {
      allowedOrigins: ['*'],
      allowedMethods: ['GET'],
      allowedHeaders: ['*'],
    },
  },
  manualVisaDocuments: {
    bucketName: 'manual-visas', // Bucket for manually uploaded visa docs
    access: {
      read: ['owner'], // Owner can view their documents
      write: ['admins'], // Backend officers can upload documents
    },
    corsPolicy: {
      allowedOrigins: ['*'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['*'],
    },
  },
});
