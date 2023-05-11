import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";

const CREDENTIALS = "paypal";

const PayPalSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: CREDENTIALS,
    intentParameters: {
      currency: "eur",
      payment_method_types: ["paypal"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
    return stripe.confirmPayPalPayment(clientSecret, {
      return_url: `${window.location.origin}/status?credentials=${CREDENTIALS}`,
    });
  };

  return (
    <Layout>
      <CredentialedElements credentials={CREDENTIALS}>
        <ElementSample onSubmit={handleSubmit} />
      </CredentialedElements>
    </Layout>
  );
};

export default PayPalSample;
