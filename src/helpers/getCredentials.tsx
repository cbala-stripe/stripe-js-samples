import { CredentialsKey, CREDENTIALS } from "../constants";

export const getCredentials = (
  key: CredentialsKey
): {
  publishableKey: string;
  secretKey: string;
  stripeAccount?: string;
  apiVersion?: string;
} => {
  const creds = CREDENTIALS[key] as {
    publishableKey: string;
    secretKey: string;
    stripeAccount?: string;
    apiVersion?: string;
  };

  return {
    publishableKey: creds.publishableKey,
    secretKey: creds.secretKey,
    ...(creds.stripeAccount ? { stripeAccount: creds.stripeAccount } : null),
    ...(creds.apiVersion ? { apiVersion: creds.apiVersion } : null),
  };
};
