import Stripe from "stripe";

import { ElementSample } from "../../components/ElementSample";

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

  return (
    <ElementSample
      onSubmit={handleSubmit}
      apiKey={process.env.NEXT_PUBLIC_OXXO_PK}
    />
  );
};

export default OxxoSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.OXXO_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 10000,
    currency: "mxn",
    payment_method_types: ["oxxo"],
  });

  return { props: { clientSecret } };
};
