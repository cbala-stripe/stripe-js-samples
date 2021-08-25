import { PaymentElement } from "@stripe/react-stripe-js";

import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getSetupIntentClientSecret } from "../../helpers/getSetupIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementUsdSetupIntentSample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmSetup({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=usBankAccount`,
      },
    });
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        credentials="usBankAccount"
        stripeOptions={{
          betas: ["payment_element_beta_1"],
          apiVersion: "2020-08-27; us_bank_account_beta=v1",
        }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <PaymentElement options={options} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementUsdSetupIntentSample;

export const getServerSideProps = async () => {
  const clientSecret = await getSetupIntentClientSecret(
    {
      payment_method_types: ["card", "us_bank_account"],
    },
    {
      credentials: "usBankAccount",
      apiVersion: "2020-08-27; us_bank_account_beta=v1",
      includeCustomer: true,
    }
  );

  return { props: { clientSecret } };
};
