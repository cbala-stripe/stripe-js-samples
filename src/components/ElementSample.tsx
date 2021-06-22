import type { FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { loadStripe, StripeConstructorOptions } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";

import { Button } from "./Button";
import { Layout } from "./Layout";
import { useDebugElement } from "../hooks/useDebugElement";
import { INPUT_CLASSNAME, LABEL_CLASSNAME, KEYS } from "../constants";
import { getStripePromise } from "../helpers";

type SubmitFn = (deps: {
  stripe: Stripe;
  elements: StripeElements;
  name: string;
  email: string;
}) => Promise<any>;

const ElementSampleInner: FC<{
  onSubmit: SubmitFn;
  collectNameAndEmail: boolean;
}> = ({ children, onSubmit, collectNameAndEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [resultElement, setResult] = useDebugElement();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("Jenny Rosen");
  const [email, setEmail] = useState("jenny.rosen@example.com");

  useEffect(() => {
    (window as any).stripe = stripe;
    (window as any).elements = elements;
  }, [stripe, elements]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await onSubmit({ stripe, elements, name, email });
      setResult(result);
      setLoading(false);
    } catch (error) {
      setResult(error);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        {collectNameAndEmail && (
          <div className="mb-4">
            <label className="block">
              <div className={LABEL_CLASSNAME}>Name</div>
              <input
                className={INPUT_CLASSNAME}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </label>
            <label className="block mt-4">
              <div className={LABEL_CLASSNAME}>Email</div>
              <input
                className={INPUT_CLASSNAME}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
            </label>
          </div>
        )}
        <div className="mb-6">{children}</div>
        <Button type="submit" onClick={handleSubmit} primary disabled={loading}>
          Submit
        </Button>
      </form>
      {resultElement}
    </>
  );
};

export const ElementSample: FC<{
  onSubmit: SubmitFn;
  account?: keyof typeof KEYS;
  stripeOptions?: StripeConstructorOptions & { betas: string[] };
  collectNameAndEmail?: boolean;
}> = ({
  onSubmit,
  children,
  account = "default",
  stripeOptions = null,
  collectNameAndEmail = true,
}) => {
  return (
    <Layout>
      <Elements stripe={getStripePromise(account, stripeOptions)}>
        <ElementSampleInner
          onSubmit={onSubmit}
          collectNameAndEmail={collectNameAndEmail}
        >
          {children}
        </ElementSampleInner>
      </Elements>
    </Layout>
  );
};
