import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // Visa Application Model
  VisaApplication: a.model({
    id: a.id(),
    name: a.string(),
    passportNumber: a.string(),
    visaType: a.string(),
    status: a.string(),
    submittedAt: a.date(),
  }).authorization((allow) => [
    allow.owner().to(["read", "update"]), // Owners can read and update their applications
    allow.groups(["Admins"]).to(["read", "update", "delete"]), // Admins have full control
  ]),

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
});
