import Stripe from "stripe";
import { FpxBankElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME } from "../../constants";
import { Field } from "../../components/Field";

const FpxSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
    return stripe.confirmFpxPayment(clientSecret, {
      payment_method: {
        fpx: elements.getElement("fpxBank"),
        billing_details: {
          name,
          email,
        },
      },
      return_url: `${window.location.origin}/status?payment_method_type=fpx`,
    });
  };

  return (
    <ElementSample
      onSubmit={handleSubmit}
      apiKey={process.env.NEXT_PUBLIC_FPX_PK}
    >
      <Field label="Bank">
        <div className={INPUT_CLASSNAME}>
          <FpxBankElement options={{ accountHolderType: "individual" }} />
        </div>
      </Field>
    </ElementSample>
  );
};

export default FpxSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.FPX_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 20000,
    currency: "myr",
    payment_method_types: ["fpx"],
  });

  return { props: { clientSecret } };
};
