import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  // Set login mechanisms
  loginWith: {
    email: {
      verificationEmailSubject: 'Welcome to the Visa System!',
    },
  },
  
  // User attributes
  userAttributes: {
    email: {
      required: true, // Email required for login
      mutable: true, // Allow users to update their email if necessary
    },
    phoneNumber: {
      required: false, // Optional phone number for MFA
      mutable: true, // Allow updating phone number
    },
    givenName: {
      required: true, // First name of the user
    },
    familyName: {
      required: true, // Last name of the user
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

  // Advanced security features
  accountRecovery: "PHONE_AND_EMAIL", // Enable account recovery via both email and SMS

});
