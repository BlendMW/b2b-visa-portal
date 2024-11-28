import { defineFunction } from '@aws-amplify/backend';

const centralLambdaPath = './centralHandler'; // Path to central handler directory

// Define individual functions
export const updateVisaStatus = ({
  functionName: 'updateVisaStatus',
  runtime: 'nodejs18.x',
  handler: 'index.handler',
  codePath: centralLambdaPath,
  environment: {
    FUNCTION_NAME: 'updateVisaStatus',
    TABLE_NAME: 'VisaApplications',
  },
});

export const sendNotification = ({
  functionName: 'sendNotification',
  runtime: 'nodejs18.x',
  handler: 'index.handler',
  codePath: centralLambdaPath,
  environment: {
    FUNCTION_NAME: 'sendNotification',
    SES_SOURCE_EMAIL: 'info@hayat.iq',
  },
});

export const generateReport = ({
  functionName: 'generateReport',
  runtime: 'nodejs18.x' as const,
  handler: 'index.handler',
  codePath: centralLambdaPath,
  environment: {
    FUNCTION_NAME: 'generateReport',
    REPORT_BUCKET: 'visa-system-reports',
  },
});

export const generateVisaTemplate = ({
  functionName: 'generateVisaTemplate',
  runtime: 'nodejs18.x',
  handler: 'index.handler',
  codePath: centralLambdaPath,
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
