import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";

const PromptPaySample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "promptpay",
    intentParameters: {
      // @ts-expect-error
      amount: 14990,
      currency: "thb",
      payment_method_types: ["promptpay"],
      statement_descriptor: "Test descriptor",
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
    return stripe.confirmPromptPayPayment(
      clientSecret,
      {
        payment_method: {
          // @ts-expect-error
          promptpay: {},
          billing_details: {
            email: "jenny.rosen@stripe.com",
          },
        },
        payment_method_options: {
          promptpay: {},
        },
      },
      { handleActions: true }
    );
  };

  return (
    <Layout>
      <CredentialedElements
        credentials="promptpay"
        stripeOptions={{ betas: ["promptpay_beta_1"] }}
      >
        <ElementSample onSubmit={handleSubmit} />
      </CredentialedElements>
    </Layout>
  );
};

export default PromptPaySample;
