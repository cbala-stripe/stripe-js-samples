import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";

const OxxoSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, name, email }) => {
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

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret(
    {
      amount: 10000,
      currency: "mxn",
      payment_method_types: ["oxxo"],
    },
    { credentials: "oxxo" }
  );

  return { props: { clientSecret } };
};
