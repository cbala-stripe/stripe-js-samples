import { CardElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
} from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";
import { INPUT_CLASSNAME } from "../../constants";

const CardSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement("card"),
      },
    });
  };

  return (
    <Layout>
      <CredentialedElements>
        <ElementSample onSubmit={handleSubmit}>
          <Field label="Card details">
            <div className={INPUT_CLASSNAME}>
              <CardElement />
            </div>
          </Field>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default CardSample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret("payment", {
    amount: 500,
    currency: "usd",
  });

  return { props: { clientSecret } };
};
