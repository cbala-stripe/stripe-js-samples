import Stripe from "stripe";
import { PaymentElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";

import { getCredentials } from "../../helpers/getCredentials";
import { useOptionsState } from "../../components/OptionsState";
import { AppearanceDropdown } from "../../components/AppearanceDropdown";
import { LocaleInput } from "../../components/LocaleInput";

const PaymentElementSubscriptionsSample = ({ clientSecret, subscription }) => {
  const {
    appearanceOption: { appearance, fonts },
    locale,
  } = useOptionsState();

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=subscriptions&subscription=${subscription}`,
      },
    });
  };

  return (
    <Layout
      controls={
        <>
          <AppearanceDropdown />
          <LocaleInput />
        </>
      }
    >
      <CredentialedElements
        credentials="subscriptions"
        options={{ clientSecret, appearance, fonts, locale }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <PaymentElement />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementSubscriptionsSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(getCredentials("subscriptions").secretKey, {
    apiVersion: "2022-11-15",
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
