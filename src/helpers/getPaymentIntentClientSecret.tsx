import Stripe from "stripe";

import { CredentialsKey, CREDENTIALS } from "../constants";

export const getPaymentIntentClientSecret = async (
  intentFields: Stripe.PaymentIntentCreateParams,
  options?: {
    credentials?: CredentialsKey;
    apiVersion?: string;
  }
) => {
  const apiVersion = options?.apiVersion ?? "2020-03-02";
  const credentials = options?.credentials ?? "default";

  const stripeAccount = (CREDENTIALS[credentials] as any).stripeAccount;
  const requestOptions = stripeAccount ? { stripeAccount } : undefined;

  const stripe = new Stripe(CREDENTIALS[credentials].secretKey, {
    // @ts-ignore
    apiVersion,
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create(
    intentFields,
    requestOptions
  );

  return clientSecret;
};
