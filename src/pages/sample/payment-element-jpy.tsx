import { PaymentElement } from "@stripe/react-stripe-js";

import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementJpySample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=konbini`,
      },
    });
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        stripeOptions={{
          betas: ["payment_element_beta_1", "konbini_pm_beta_1"],
          apiVersion: "2020-08-27; konbini_beta=v2",
        }}
        credentials="konbini"
      >
        <ElementSample onSubmit={handleSubmit}>
          <PaymentElement options={options} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementJpySample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret(
    {
      amount: 1099,
      currency: "jpy",
      payment_method_types: ["card", "konbini"],
      payment_method_options: {
        // @ts-ignore
        konbini: {
          product_description: "Tシャツ",
        },
      },
    },
    {
      credentials: "konbini",
      apiVersion: "2020-08-27; konbini_beta=v2",
    }
  );

  return { props: { clientSecret } };
};
