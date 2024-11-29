import { defineFunction } from '@aws-amplify/backend';

const centralLambdaPath = './functions'; // Directory containing handler files

// Define individual functions
export const updateVisaStatus = defineFunction({
  name: 'updateVisaStatus',
  runtime: 20, // Node.js runtime version
  entry: `${centralLambdaPath}/updateVisaStatus/handler.ts`, // File containing the handler function
  environment: {
    FUNCTION_NAME: 'updateVisaStatus',
    TABLE_NAME: 'VisaApplications',
  },
});

export const sendNotification = defineFunction({
  name: 'sendNotification',
  runtime: 20,
  entry: `${centralLambdaPath}/sendNotification/handler.ts`,
  environment: {
    FUNCTION_NAME: 'sendNotification',
    SES_SOURCE_EMAIL: 'info@hayat.iq',
  },
});

export const generateReport = defineFunction({
  name: 'generateReport',
  runtime: 20,
  entry: `${centralLambdaPath}/generateReport/handler.ts`,
  environment: {
    FUNCTION_NAME: 'generateReport',
    REPORT_BUCKET: 'visa-system-reports',
  },
});

export const generateVisaTemplate = defineFunction({
  name: 'generateVisaTemplate',
  runtime: 20,
  entry: `${centralLambdaPath}/generateVisaTemplate/handler.ts`,
  environment: {
    FUNCTION_NAME: 'generateVisaTemplate',
    PDF_BUCKET: 'visa-templates',
    QR_CODE_FIELD: 'qrCode',
  },
});

// Add the required `resources` and `getInstance` properties
export const functions = {
  resources: {
    updateVisaStatus,
    sendNotification,
    generateReport,
    generateVisaTemplate,
  },
  getInstance: () => {
    console.log('Returning instance of the functions');
    return functions;
  },
};