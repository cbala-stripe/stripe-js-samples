import type { FC } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeConstructorOptions } from "@stripe/stripe-js";

import { CredentialsKey } from "../constants";
import { getStripePromise } from "../helpers/getStripePromise";

export const CredentialedElements: FC<{
  credentials?: CredentialsKey;
  stripeOptions?: StripeConstructorOptions & { betas: string[] };
}> = ({ children, credentials = "default", stripeOptions }) => {
  return (
    <Elements stripe={getStripePromise(credentials, stripeOptions)}>
      {children}
    </Elements>
  );
};
