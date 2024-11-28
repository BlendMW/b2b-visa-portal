import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // User Model
  User: a.model({
    userId: a.id().required(),
    name: a.string().required(),
    role: a.enum(['SUPERUSER', 'ACCOUNT_MANAGER', 'VISA_OFFICER', 'ACCOUNTING_MANAGER', 'PRODUCT_MANAGER', 'ARRIVAL_MANAGER', 'DEPARTURE_MANAGER']),
    email: a.string().required(),
    isActive: a.boolean().default(true),
  }).authorization((allow) => [allow.owner()]),

  // Visa Application Model
  VisaApplication: a.model({
    applicationId: a.id().required(),
    userId: a.id().required(),
    visaType: a.enum(['TOURISM', 'WORK', 'MULTI_ENTRY']),
    isManualProcessing: a.boolean().default(false),
    status: a.enum(['PENDING', 'APPROVED', 'REJECTED']),
    qrCode: a.string(),
    arrivalDate: a.string(),
    departureDate: a.string(),
    accommodationDetails: a.string(),
  }).authorization((allow) => [allow.owner()]),

  // Corporate Wallet Model
  Wallet: a.model({
    corporateId: a.string(), // Unique ID for corporate users
    balance: a.float(), // Wallet balance
  }).authorization((allow) => [
    allow.owner().to(["read", "update"]), // Owners can view and update their wallets
    allow.groups(["Admins"]).to(["read", "update"]), // Admins can manage wallets
  ]),

  // Transactions Model
  Transaction: a.model({
    id: a.id(), // Unique transaction ID
    walletId: a.string(), // Foreign key to the Wallet model
    type: a.string(), // Transaction type (e.g., debit, credit)
    amount: a.float(), // Transaction amount
    date: a.date(), // Transaction date
  }).authorization((allow) => [
    allow.owner().to(["read"]), // Owners can view their transactions
    allow.groups(["Admins"]).to(["read", "update", "delete"]), // Admins can manage transactions
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
