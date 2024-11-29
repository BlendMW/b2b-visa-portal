import { defineBackend } from "@aws-amplify/backend";

import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage, visaTemplates, manualVisaDocuments } from './storage/resource';
import { functions } from './functions/resource';

export default defineBackend({
  auth,
  data,
  storage,
  visaTemplates,
  manualVisaDocuments,
  functions,
});
