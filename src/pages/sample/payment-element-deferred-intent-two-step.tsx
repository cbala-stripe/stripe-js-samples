import { PaymentElement } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";

const PaymentElementDeferredIntentTwoStepSample = () => {
  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    await elements.submit();

    // Create a PaymentMethod
    const { paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });

    // Create a PaymentIntent with the PaymentMethod attached
    const resp = await fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intentType: "payment",
        credentials: "default",
        intentParameters: {
          currency: "eur",
          automatic_payment_methods: { enabled: true },
          payment_method: paymentMethod.id,
        },
      }),
    });

    const { clientSecret } = await resp.json();

    // Confirm the PaymentIntent
    return stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });
  };

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "eur",
    paymentMethodCreation: "manual",
  };

  return (
    <Layout>
      <CredentialedElements options={options}>
        <ElementSample onSubmit={handleSubmit}>
          <PaymentElement />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementDeferredIntentTwoStepSample;
