import { IdealBankElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";
import { INPUT_CLASSNAME } from "../../constants";

const IdealSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "eur",
      payment_method_types: ["ideal"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
    return stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: elements.getElement("idealBank"),
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
          <Field label="Bank">
            <div className={INPUT_CLASSNAME}>
              <IdealBankElement />
            </div>
          </Field>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default IdealSample;
