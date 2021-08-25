import { AuBankAccountElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  TestInstructions,
} from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";
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
          <TestInstructions paymentMethod="au_becs_debit" />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default AuBankAccountSample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret(
    "payment",
    {
      amount: 1099,
      currency: "aud",
      payment_method_types: ["au_becs_debit"],
    },
    { credentials: "auBecs" }
  );

  return { props: { clientSecret } };
};
