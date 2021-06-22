import { AuBankAccountElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
} from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { INPUT_CLASSNAME } from "../../constants";

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
    <Layout>
      <CredentialedElements credentials="auBecs">
        <ElementSample collectNameAndEmail onSubmit={handleSubmit}>
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
      </CredentialedElements>
    </Layout>
  );
};

export default AuBankAccountSample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret(
    {
      amount: 1099,
      currency: "aud",
      payment_method_types: ["au_becs_debit"],
    },
    { credentials: "auBecs" }
  );

  return { props: { clientSecret } };
};
