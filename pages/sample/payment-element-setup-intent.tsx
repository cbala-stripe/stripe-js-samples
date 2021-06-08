import { useEffect } from "react";
import Stripe from "stripe";
import { PaymentElement, useElements } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";

const PaymentElementSetupIntentSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmSetup({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });
  };

  const options = {
    clientSecret,
    business: { name: "Whole Moods, Inc." },
    appearance: {
      rules: {},
    },
  };

  return (
    <ElementSample
      onSubmit={handleSubmit}
      stripeOptions={{ betas: ["payment_element_beta_1"] }}
      collectNameAndEmail={false}
    >
      <PaymentElement options={options} />
    </ElementSample>
  );
};

export default PaymentElementSetupIntentSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.DEFAULT_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.setupIntents.create({
    payment_method_types: ["card", "ideal", "bancontact"],
  });

  return { props: { clientSecret } };
};
