import { IbanElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
} from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
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
          <ul className="text-sm mt-4 list-disc list-inside">
            <li>
              Test success IBAN: <code>AT61 1904 3002 3457 3201</code>
            </li>
            <li>
              Test failure IBAN: <code>AT86 1904 3002 3547 3202</code>
            </li>
          </ul>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default IbanSample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret({
    amount: 500,
    currency: "eur",
    payment_method_types: ["sepa_debit"],
  });

  return { props: { clientSecret } };
};
