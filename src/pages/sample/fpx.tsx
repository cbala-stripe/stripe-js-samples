import { FpxBankElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
} from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { INPUT_CLASSNAME } from "../../constants";

const FpxSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
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

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret(
    {
      amount: 20000,
      currency: "myr",
      payment_method_types: ["fpx"],
    },
    { credentials: "fpx" }
  );

  return { props: { clientSecret } };
};
