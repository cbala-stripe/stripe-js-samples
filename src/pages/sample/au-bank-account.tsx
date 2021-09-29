import { AuBankAccountElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  TestInstructions,
  SubmitCallback,
} from "../../components";
import { INPUT_CLASSNAME } from "../../constants";
import { useClientSecret } from "../../hooks";

const AuBankAccountSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "auBecs",
    intentParameters: {
      currency: "aud",
      payment_method_types: ["au_becs_debit"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
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
