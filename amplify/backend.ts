import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage, visaTemplates, manualVisaDocuments } from './storage/resource';
import { functions } from './functions/resource';

export default ({
  auth,
  data,
  storage,
  visaTemplates,
  manualVisaDocuments,
  functions,
  getInstance() {
    return {
      auth,
      data,
      storage,
      functions,
      visaTemplates,
      manualVisaDocuments,
    };
  },
});
