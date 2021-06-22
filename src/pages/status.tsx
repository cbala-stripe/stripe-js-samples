import { useEffect, useState } from "react";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useDebugElement } from "../hooks/useDebugElement";
import { Layout } from "../components/Layout";
import { getStripePromise } from "../helpers";

const Status = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [resultElement, setResult] = useDebugElement();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    const paymentIntentClientSecret = searchParams.get(
      "payment_intent_client_secret"
    );

    const setupIntentClientSecret = searchParams.get(
      "setup_intent_client_secret"
    );

    if (paymentIntentClientSecret) {
      stripe.retrievePaymentIntent(paymentIntentClientSecret).then(setResult);
    } else if (setupIntentClientSecret) {
      stripe.retrieveSetupIntent(setupIntentClientSecret).then(setResult);
    } else {
      throw new Error("Expected client secret query parameter but found none");
    }
  }, [stripe]);

  return resultElement;
};

const StatusPage = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const account = searchParams.get("account") ?? "default";

    setStripePromise(getStripePromise(account as any, null));
  }, []);

  return (
    <Layout>
      <div className="mt-6">
        <Elements stripe={stripePromise}>
          <Status />
        </Elements>
      </div>
    </Layout>
  );
};

export default StatusPage;
