import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";

const OxxoSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "oxxo",
    intentParameters: {
      currency: "mxn",
      payment_method_types: ["oxxo"],
    },
  });

  const handleSubmit: SubmitCallback = async ({ stripe, name, email }) => {
    return stripe.confirmOxxoPayment(clientSecret, {
      payment_method: {
        billing_details: {
          name,
          email,
        },
      },
    });
  };

  return (
    <Layout>
      <CredentialedElements credentials="oxxo">
        <ElementSample collectNameAndEmail onSubmit={handleSubmit} />
      </CredentialedElements>
    </Layout>
  );
};

export default OxxoSample;
