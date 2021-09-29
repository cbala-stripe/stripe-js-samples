import { IbanElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  TestInstructions,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";
import { INPUT_CLASSNAME } from "../../constants";

const IbanSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "eur",
      payment_method_types: ["sepa_debit"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
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
