import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";

const KonbiniSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, name, email }) => {
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

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret(
    "payment",
    {
      amount: 1099,
      currency: "jpy",
      payment_method_types: ["konbini"],
      payment_method_options: {
        // @ts-ignore
        konbini: {
          product_description: "Tシャツ",
        },
      },
    },
    {
      credentials: "konbini",
    }
  );

  return { props: { clientSecret } };
};
