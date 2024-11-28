import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { functions } from './functions/resource';

export default ({
  auth,
  data,
  storage,
  functions,
  getInstance() {
    return {
      auth,
      data,
      storage,
      functions,
    };
  },
});
