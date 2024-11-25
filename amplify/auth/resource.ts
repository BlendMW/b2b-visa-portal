import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  // Set login mechanism
  loginWith: {
    email: true,
  },

  // User attributes
  userAttributes: {
    email: {
      required: true, // Email required for login
    },
    phoneNumber: {
      required: false, // Optional phone number for MFA
    },
  },

  // Multi-factor authentication configuration
  multifactor: {
    mode: "OPTIONAL", // Allow users to enable MFA optionally
    sms: true, // Enable SMS-based MFA
    totp: true, // Enable Time-based One-Time Password (TOTP)
  },

  // Email sender configuration
  senders: {
    email: {
      fromEmail: "no-reply@b2bvisaportal.com", // Email address used for notifications
      fromName: "B2B Visa Portal", // Sender name
    },
  },
});
