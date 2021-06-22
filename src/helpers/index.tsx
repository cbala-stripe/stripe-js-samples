import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe, StripeConstructorOptions } from "@stripe/stripe-js";

import { KEYS } from "../constants";

const stripePromiseCache = {};

export const getStripePromise = (
  account: keyof typeof KEYS,
  options: null | (StripeConstructorOptions & { betas: string[] })
): Promise<Stripe> => {
  const { publishableKey, stripeAccount } = KEYS[account] as {
    publishableKey: string;
    secretKey: string;
    stripeAccount?: string;
  };

  const allOptions = { ...options, stripeAccount };

  const cacheKey = `${publishableKey} ${JSON.stringify(allOptions)}`;

  if (!stripePromiseCache[cacheKey]) {
    // @ts-ignore
    stripePromiseCache[cacheKey] = loadStripe(publishableKey, allOptions);
  }

  return stripePromiseCache[cacheKey];
};
