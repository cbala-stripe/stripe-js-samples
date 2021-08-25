import { IbanElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  TestInstructions,
} from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";
import { INPUT_CLASSNAME } from "../../constants";

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
    <Layout>
      <CredentialedElements>
        <ElementSample collectNameAndEmail onSubmit={handleSubmit}>
          <Field label="IBAN">
            <div className={INPUT_CLASSNAME}>
              <IbanElement options={{ supportedCountries: ["SEPA"] }} />
            </div>
          </Field>
          <TestInstructions paymentMethod="sepa_debit" />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default IbanSample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret("payment", {
    amount: 500,
    currency: "eur",
    payment_method_types: ["sepa_debit"],
  });

  return { props: { clientSecret } };
};
