import type {
  Stripe,
  StripeConstructor,
  StripeConstructorOptions,
} from "@stripe/stripe-js";

import { CredentialsKey } from "../constants";
import { getCredentials } from "./getCredentials";

const stripePromiseCache = {};

const getStripeConstructor = (): Promise<StripeConstructor> => {
  return new Promise((resolve, reject) => {
    let attemptsLeft = 20;

    const check = () => {
      if (window.Stripe) {
        resolve(window.Stripe);
      } else if (attemptsLeft === 0) {
        reject("could not find Stripe constructor on window");
      } else {
        setTimeout(check, 500);
        attemptsLeft -= 1;
      }
    };

    check();
  });
};

const initStripe = async (
  pk: string,
  options: StripeConstructorOptions
): Promise<Stripe> => {
  const stripeConstructor = await getStripeConstructor();

  return stripeConstructor(pk, options);
};

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
    stripePromiseCache[cacheKey] = initStripe(publishableKey, allOptions);
  }

  return stripePromiseCache[cacheKey];
};
