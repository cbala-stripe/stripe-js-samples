import Stripe from "stripe";
import { IbanElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME, KEYS } from "../../constants";
import { Field } from "../../components/Field";

const IbanSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
    return stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: elements.getElement("iban"),
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
      <Field label="IBAN">
        <div className={INPUT_CLASSNAME}>
          <IbanElement options={{ supportedCountries: ["SEPA"] }} />
        </div>
      </Field>
      <ul className="text-sm mt-4 list-disc list-inside">
        <li>
          Test success IBAN: <code>AT61 1904 3002 3457 3201</code>
        </li>
        <li>
          Test failure IBAN: <code>AT86 1904 3002 3547 3202</code>
        </li>
      </ul>
    </ElementSample>
  );
};

export default IbanSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(KEYS.default.secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 500,
    currency: "eur",
    payment_method_types: ["sepa_debit"],
  });

  return { props: { clientSecret } };
};
