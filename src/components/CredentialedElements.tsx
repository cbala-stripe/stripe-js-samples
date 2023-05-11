import type { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import type {
  StripeConstructorOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";

import { CredentialsKey } from "../constants";
import { getStripePromise } from "../helpers/getStripePromise";

export const CredentialedElements = ({
  children,
  credentials = "default",
  stripeOptions,
  options,
}: {
  children: ReactNode;
  credentials?: CredentialsKey;
  stripeOptions?: StripeConstructorOptions & { betas: string[] };
  options?: StripeElementsOptions;
}) => {
  const key = `${options?.fonts}${options?.clientSecret}`;

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
