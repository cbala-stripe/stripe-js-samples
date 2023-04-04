import { PaymentElement } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from "@stripe/stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";

const PaymentElementDeferredIntentSample = () => {
  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    await elements.submit();

    const resp = await fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intentType: "payment",
        credentials: "default",
        intentParameters: {
          currency: "eur",
          automatic_payment_methods: { enabled: true },
        },
      }),
    });

    const { clientSecret } = await resp.json();

    return stripe.confirmPayment({
      elements,
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

export default PaymentElementDeferredIntentSample;
