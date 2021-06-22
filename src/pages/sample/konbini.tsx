import Stripe from "stripe";

import { ElementSample } from "../../components/ElementSample";
import { KEYS } from "../../constants";

const KonbiniSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, name, email }) => {
    return stripe.confirmKonbiniPayment(clientSecret, {
      payment_method: {
        konbini: {},
        billing_details: {
          name,
          email,
        },
      },
      payment_method_options: {
        konbini: {
          confirmation_number: "5555555555",
        },
      },
    });
  };

  return (
    <ElementSample
      account="konbini"
      stripeOptions={{
        betas: ["konbini_pm_beta_1"],
        apiVersion: "2020-08-27; konbini_beta=v2",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default KonbiniSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(KEYS.konbini.secretKey, {
    // @ts-ignore
    apiVersion: "2020-08-27; konbini_beta=v2",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "jpy",
    payment_method_types: ["konbini"],
    payment_method_options: {
      // @ts-ignore
      konbini: {
        product_description: "Tシャツ",
      },
    },
  });

  return { props: { clientSecret } };
};
