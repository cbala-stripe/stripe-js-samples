import { AfterpayClearpayMessageElement } from "@stripe/react-stripe-js";
import { CredentialedElements, Layout } from "../../components";

const AfterpayMessageSample = () => {
  return (
    <Layout>
      <CredentialedElements>
        <AfterpayClearpayMessageElement
          options={{ amount: 100000, currency: "USD" }}
        />
      </CredentialedElements>
    </Layout>
  );
};

export default AfterpayMessageSample;
