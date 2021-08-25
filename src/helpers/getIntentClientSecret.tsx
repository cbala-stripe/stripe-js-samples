import Stripe from "stripe";

import { CredentialsKey, CREDENTIALS } from "../constants";

export const getIntentClientSecret = async (
  intentType: "payment" | "setup",
  intentFields:
    | Stripe.PaymentIntentCreateParams
    | Stripe.SetupIntentCreateParams,
  options?: {
    credentials?: CredentialsKey;
    includeCustomer?: boolean;
  }
): Promise<string> => {
  const credentialsKey = options?.credentials ?? "default";
  const { secretKey, stripeAccount, apiVersion } = CREDENTIALS[
    credentialsKey
  ] as {
    secretKey: string;
    stripeAccount?: string;
    apiVersion?: string;
  };

  const stripe = new Stripe(secretKey, {
    // @ts-ignore
    apiVersion,
  });

  if (options?.includeCustomer) {
    const { id } = await stripe.customers.create();
    intentFields = { ...intentFields, customer: id };
  }

  const requestOptions = stripeAccount ? { stripeAccount } : undefined;

  let resp: Stripe.PaymentIntent | Stripe.SetupIntent;
  if (intentType === "payment") {
    // @ts-ignore: assume the caller passed in `intentFields` corresponding to the `intentType`
    resp = await stripe.paymentIntents.create(intentFields, requestOptions);
  } else {
    resp = await stripe.setupIntents.create(intentFields, requestOptions);
  }

  return resp.client_secret;
};
