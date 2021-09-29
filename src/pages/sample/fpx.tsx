import { FpxBankElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";
import { INPUT_CLASSNAME } from "../../constants";

const FpxSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "fpx",
    intentParameters: {
      currency: "myr",
      payment_method_types: ["fpx"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
    return stripe.confirmFpxPayment(clientSecret, {
      payment_method: {
        fpx: elements.getElement("fpxBank"),
        billing_details: {
          name,
          email,
        },
      },
      return_url: `${window.location.origin}/status?credentials=fpx`,
    });
  };

  return (
    <Layout>
      <CredentialedElements credentials="fpx">
        <ElementSample collectNameAndEmail onSubmit={handleSubmit}>
          <Field label="Bank">
            <div className={INPUT_CLASSNAME}>
              <FpxBankElement options={{ accountHolderType: "individual" }} />
            </div>
          </Field>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default FpxSample;
