import Stripe from "stripe";

import { CredentialsKey, CREDENTIALS } from "../constants";

export const getSetupIntentClientSecret = async (
  intentFields: Stripe.SetupIntentCreateParams,
  options?: {
    credentials?: CredentialsKey;
  }
) => {
  const credentials = options?.credentials ?? "default";

  const stripeAccount = (CREDENTIALS[credentials] as any).stripeAccount;
  const requestOptions = stripeAccount ? { stripeAccount } : undefined;

  const stripe = new Stripe(CREDENTIALS[credentials].secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.setupIntents.create(
    intentFields,
    requestOptions
  );

  return clientSecret;
};
