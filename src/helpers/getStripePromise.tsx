import type { Stripe } from "@stripe/stripe-js";
import { loadStripe, StripeConstructorOptions } from "@stripe/stripe-js";

import { CredentialsKey, CREDENTIALS } from "../constants";

const stripePromiseCache = {};

export const getStripePromise = (
  credentials: CredentialsKey,
  additionalOptions?: StripeConstructorOptions & { betas: string[] }
): Promise<Stripe> => {
  const { publishableKey, stripeAccount } = CREDENTIALS[credentials] as {
    publishableKey: string;
    secretKey: string;
    stripeAccount?: string;
  };

  const allOptions = { ...additionalOptions, stripeAccount };

  const cacheKey = `${publishableKey} ${JSON.stringify(allOptions)}`;

  if (!stripePromiseCache[cacheKey]) {
    // @ts-ignore
    stripePromiseCache[cacheKey] = loadStripe(publishableKey, allOptions);
  }

  return stripePromiseCache[cacheKey];
};
