import { defineStorage } from '@aws-amplify/backend';

// Define default storage bucket
export const storage = defineStorage({
  name: 'visaSystemStorage', // Friendly name to identify the bucket
  isDefault: true, // Mark as the default storage bucket
  access: (allow) => ({
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']), // Private files, accessible only by the owner
    ],
    'public/*': [
      allow.authenticated.to(['read', 'write']), // Public files, accessible to authenticated users
      allow.guest.to(['read']), // Guests can read public files
    ],
  }),
});

// Define additional storage for visa templates
export const visaTemplates = defineStorage({
  name: 'visaTemplates',
  access: (allow) => ({
    'templates/{entity_id}/*': [
      allow.entity('identity').to(['read']), // Allow identity users to read templates
      allow.groups(['system']).to(['write']), // Allow 'system' group to write templates
    ],
  }),
});

// Define additional storage for manual visa documents
export const manualVisaDocuments = defineStorage({
  name: 'manualVisaDocs',
  access: (allow) => ({
    'manual/{entity_id}/*': [
      allow.entity('identity').to(['read']), // Allow owners to read
      allow.groups(['admins']).to(['write']), // Allow 'admins' group to write
    ],
  }),
});
