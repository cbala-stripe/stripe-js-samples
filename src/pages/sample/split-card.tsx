import Stripe from "stripe";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { Field } from "../../components/Field";
import { INPUT_CLASSNAME, KEYS } from "../../constants";

const SplitCardSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement("cardNumber") },
    });
  };

  return (
    <ElementSample onSubmit={handleSubmit} collectNameAndEmail={false}>
      <div className="grid gap-4">
        <Field label="Card number">
          <div className={INPUT_CLASSNAME}>
            <CardNumberElement />
          </div>
        </Field>
        <Field label="Expiry">
          <div className={INPUT_CLASSNAME}>
            <CardExpiryElement />
          </div>
        </Field>
        <Field label="CVC">
          <div className={INPUT_CLASSNAME}>
            <CardCvcElement />
          </div>
        </Field>
      </div>
    </ElementSample>
  );
};

export default SplitCardSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(KEYS.default.secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 500,
    currency: "usd",
  });

  return { props: { clientSecret } };
};
