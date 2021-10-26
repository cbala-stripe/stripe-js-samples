import type { Stripe } from "@stripe/stripe-js";
import { loadStripe, StripeConstructorOptions } from "@stripe/stripe-js";

import { CredentialsKey } from "../constants";
import { getCredentials } from "./getCredentials";

const stripePromiseCache = {};

export const getStripePromise = (
  credentialsKey: CredentialsKey,
  additionalOptions?: StripeConstructorOptions & { betas: string[] }
): Promise<Stripe> => {
  const { publishableKey, stripeAccount, apiVersion } =
    getCredentials(credentialsKey);

  const allOptions = {
    stripeAccount,
    apiVersion,
    ...additionalOptions,
  };

  const cacheKey = `${publishableKey} ${JSON.stringify(allOptions)}`;

  if (!stripePromiseCache[cacheKey]) {
    // @ts-ignore
    stripePromiseCache[cacheKey] = loadStripe(publishableKey, allOptions);
  }

  return stripePromiseCache[cacheKey];
};
