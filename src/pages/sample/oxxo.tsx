import Stripe from "stripe";

import { ElementSample } from "../../components/ElementSample";
import { KEYS } from "../../constants";

const OxxoSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, name, email }) => {
    return stripe.confirmOxxoPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
          email,
        },
      },
    });
  };

  return <ElementSample onSubmit={handleSubmit} account="oxxo" />;
};

export default OxxoSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(KEYS.oxxo.secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 10000,
    currency: "mxn",
    payment_method_types: ["oxxo"],
  });

  return { props: { clientSecret } };
};
