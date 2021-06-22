import Stripe from "stripe";
import { FpxBankElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME, KEYS } from "../../constants";
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
      return_url: `${window.location.origin}/status?account=fpx`,
    });
  };

  return (
    <ElementSample onSubmit={handleSubmit} account="fpx">
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
  const stripe = new Stripe(KEYS.fpx.secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 20000,
    currency: "myr",
    payment_method_types: ["fpx"],
  });

  return { props: { clientSecret } };
};
