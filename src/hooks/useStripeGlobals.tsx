import { useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export const useStripeGlobals = () => {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    (window as any).stripe = stripe;
    (window as any).elements = elements;
  }, [stripe, elements]);
};

export const AttachStripeGlobals = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useStripeGlobals();

  return <>{children}</>;
};
