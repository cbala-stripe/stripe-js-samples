import type { FC } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  StripeConstructorOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";

import { CredentialsKey } from "../constants";
import { getStripePromise } from "../helpers/getStripePromise";

export const CredentialedElements: FC<{
  credentials?: CredentialsKey;
  stripeOptions?: StripeConstructorOptions & { betas: string[] };
  options?: StripeElementsOptions;
}> = ({ children, credentials = "default", stripeOptions, options }) => {
  const key = JSON.stringify(options);

  return (
    <Elements
      stripe={getStripePromise(credentials, stripeOptions)}
      options={options}
      key={key}
    >
      {children}
    </Elements>
  );
};
