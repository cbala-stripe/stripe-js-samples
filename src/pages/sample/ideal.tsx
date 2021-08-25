import { IdealBankElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
} from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";
import { INPUT_CLASSNAME } from "../../constants";

const IdealSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
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

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret("payment", {
    currency: "eur",
    amount: 500,
    payment_method_types: ["ideal"],
  });

  return { props: { clientSecret } };
};
