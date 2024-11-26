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
      fromEmail: "blend@hayat.iq", // Email address used for notifications
      fromName: "Blend by Hayat", // Appropriate sender name
    },
  },
});
