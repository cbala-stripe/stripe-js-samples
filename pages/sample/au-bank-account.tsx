import Stripe from "stripe";
import { AuBankAccountElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME } from "../../constants";
import { Field } from "../../components/Field";

const AuBankAccountSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
    return stripe.confirmAuBecsDebitPayment(clientSecret, {
      payment_method: {
        au_becs_debit: elements.getElement("auBankAccount"),
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
      apiKey={process.env.NEXT_PUBLIC_AU_BECS_DEBIT_PK}
    >
      <Field label="Bank">
        <div className={INPUT_CLASSNAME}>
          <AuBankAccountElement />
        </div>
      </Field>
      <ul className="text-sm mt-4 list-disc list-inside">
        <li>
          Test BSB number: <code>000-000</code>
        </li>
        <li>
          Test success account number: <code>000123456</code>
        </li>
        <li>
          Test failure account number: <code>111111113</code>
        </li>
      </ul>
    </ElementSample>
  );
};

export default AuBankAccountSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(process.env.AU_BECS_DEBIT_SK, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "aud",
    payment_method_types: ["au_becs_debit"],
  });

  return { props: { clientSecret } };
};
