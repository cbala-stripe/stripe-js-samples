import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";

const KonbiniSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "konbini",
    intentParameters: {
      currency: "jpy",
      payment_method_types: ["konbini"],
      payment_method_options: {
        // @ts-ignore
        konbini: {
          product_description: "Tシャツ",
        },
      },
    },
  });

  const handleSubmit: SubmitCallback = async ({ stripe, name, email }) => {
    // @ts-expect-error
    return stripe.confirmKonbiniPayment(clientSecret, {
      payment_method: {
        konbini: {},
        billing_details: {
          name,
          email,
        },
      },
      payment_method_options: {
        konbini: {
          confirmation_number: "5555555555",
        },
      },
    });
  };

  return (
    <Layout>
      <CredentialedElements
        credentials="konbini"
        stripeOptions={{
          betas: ["konbini_pm_beta_1"],
        }}
      >
        <ElementSample collectNameAndEmail onSubmit={handleSubmit} />
      </CredentialedElements>
    </Layout>
  );
};

export default KonbiniSample;
