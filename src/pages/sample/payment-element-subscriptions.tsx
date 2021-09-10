import Stripe from "stripe";
import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  TestInstructions,
} from "../../components";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

import { CREDENTIALS } from "../../constants";

const PaymentElementSubscriptionsSample = ({ clientSecret, subscription }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=subscriptions&subscription=${subscription}`,
      },
    });
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.value.type);
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        credentials="subscriptions"
        stripeOptions={{
          betas: ["payment_element_beta_1"],
        }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <TestInstructions paymentMethod={selectedPaymentMethod} />
          {/* @ts-ignore */}
          <PaymentElement options={options} onChange={handleChange} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementSubscriptionsSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(CREDENTIALS.subscriptions.secretKey, {
    apiVersion: "2020-08-27",
  });

  const customer = await stripe.customers.create({
    name: "Christopher (stripe-js-samples)",
    email: "christopher@stripe.com",
  });

  // Log in to go/stripe-shop then visit https://dashboard.stripe.com/test/products/prod_KC7qRLKKYzPASK
  const PRICE = "price_0JXjay589O8KAxCGduKeov0e";

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    payment_behavior: "default_incomplete",
    items: [{ price: PRICE }],
    expand: ["latest_invoice.payment_intent"],
  });

  // @ts-expect-error: we expanded the Invoice and PaymentIntent
  const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

  return { props: { clientSecret, subscription: subscription.id } };
};
