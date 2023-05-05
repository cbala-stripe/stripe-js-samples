import { AffirmMessageElement } from "@stripe/react-stripe-js";
import { CredentialedElements, Layout } from "../../components";

const AffirmMessageSample = () => {
  return (
    <Layout>
      <CredentialedElements>
        <AffirmMessageElement options={{ amount: 100000, currency: "USD" }} />
      </CredentialedElements>
    </Layout>
  );
};

export default AffirmMessageSample;
