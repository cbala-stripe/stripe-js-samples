import type { FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { Button } from "./Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { useDebugElement } from "../hooks/useDebugElement";

type SubmitFn = (deps: {
  stripe: Stripe;
  elements: StripeElements;
  name: string;
  email: string;
}) => Promise<any>;

export const ElementSample: FC<{
  onSubmit: SubmitFn;
  collectNameAndEmail?: boolean;
}> = ({ onSubmit, children, collectNameAndEmail = false }) => {
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
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {collectNameAndEmail && (
          <>
            <Field label="name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </>
        )}
        <div>{children}</div>
        <Button
          type="submit"
          onClick={handleSubmit}
          primary
          disabled={loading}
          className="mt-2"
        >
          Submit
        </Button>
      </form>
      {resultElement}
    </div>
  );
};
