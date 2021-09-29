import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { CredentialsKey, CREDENTIALS } from "../../constants";

export type IntentRequest = {
  intentType: "payment" | "setup";
  credentials: CredentialsKey;
  attachNewCustomer?: boolean;
  intentParameters: {
    currency?: string;
    automatic_payment_methods?: { enabled: boolean };
    payment_method_types?: string[];
    confirmation_method?: "manual" | "automatic" | null;
    payment_method_options?: {
      konbini?: {
        product_description?: string;
      };
    };
  };
};

const intentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { intentType, credentials, attachNewCustomer, intentParameters } =
    req.body as IntentRequest;

  const { secretKey, stripeAccount, apiVersion } = CREDENTIALS[credentials] as {
    secretKey: string;
    stripeAccount?: string;
    apiVersion?: string;
  };

  // @ts-expect-error
  const stripe = new Stripe(secretKey, { apiVersion });

  const resolvedIntentParameters = {
    ...intentParameters,
    ...(intentType === "payment" ? { amount: 9999 } : null),
    ...(attachNewCustomer
      ? { customer: (await stripe.customers.create()).id }
      : null),
  };

  const requestOptions = stripeAccount ? { stripeAccount } : undefined;

  let resp: Stripe.PaymentIntent | Stripe.SetupIntent;
  if (intentType === "payment") {
    resp = await stripe.paymentIntents.create(
      // @ts-expect-error
      resolvedIntentParameters,
      requestOptions
    );
  } else {
    resp = await stripe.setupIntents.create(
      // @ts-expect-error
      resolvedIntentParameters,
      requestOptions
    );
  }

  res.json({ clientSecret: resp.client_secret });
};

export default intentHandler;
