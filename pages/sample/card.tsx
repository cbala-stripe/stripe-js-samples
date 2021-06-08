import Stripe from "stripe";
import { CardElement } from "@stripe/react-stripe-js";

import { Field } from "../../components/Field";
import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME } from "../../constants";

const CardSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement("card"),
      },
    });
  };

  return (
    <ElementSample onSubmit={handleSubmit} collectNameAndEmail={false}>
      <Field label="Card details">
        <div className={INPUT_CLASSNAME}>
          <CardElement />
        </div>
      </Field>
    </ElementSample>
  );
};

export default CardSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.DEFAULT_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
  });

  return { props: { clientSecret } };
};
