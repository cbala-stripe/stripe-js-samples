import Stripe from "stripe";
import { PaymentElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import * as paymentElementThemes from "../../constants/paymentElementThemes";

const PaymentElementPaymentIntentSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });
  };

  const options = {
    clientSecret,
  };

  return (
    <ElementSample
      stripeOptions={{ betas: ["payment_element_beta_1"] }}
      onSubmit={handleSubmit}
      collectNameAndEmail={false}
    >
      <PaymentElement options={options} />
    </ElementSample>
  );
};

export default PaymentElementPaymentIntentSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.DEFAULT_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 999,
    currency: "eur",
    payment_method_types: [
      "card",
      "ideal",
      "bancontact",
      "eps",
      "giropay",
      "p24",
    ],
  });

  return { props: { clientSecret } };
};
