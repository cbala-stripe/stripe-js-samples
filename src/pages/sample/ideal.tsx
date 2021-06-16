import Stripe from "stripe";
import { IdealBankElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME } from "../../constants";
import { Field } from "../../components/Field";

const IdealSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
    return stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: elements.getElement("idealBank"),
        billing_details: {
          name,
          email,
        },
      },
      return_url: `${window.location.origin}/status`,
    });
  };

  return (
    <ElementSample onSubmit={handleSubmit}>
      <Field label="Bank">
        <div className={INPUT_CLASSNAME}>
          <IdealBankElement />
        </div>
      </Field>
    </ElementSample>
  );
};

export default IdealSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.DEFAULT_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 500,
    currency: "eur",
    payment_method_types: ["ideal"],
  });

  return { props: { clientSecret } };
};
