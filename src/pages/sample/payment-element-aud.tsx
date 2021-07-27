import { PaymentElement } from "@stripe/react-stripe-js";

import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementAudSample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
    business: { name: "Test Name, LLC" },
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=auBecs`,
      },
    });
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        credentials="auBecs"
        stripeOptions={{ betas: ["payment_element_beta_1"] }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <ul className="text-sm mb-6 list-disc list-inside">
            <li>
              Test BSB number: <code>000-000</code>
            </li>
            <li>
              Test success account number: <code>000123456</code>
            </li>
            <li>
              Test failure account number: <code>111111113</code>
            </li>
          </ul>
          <PaymentElement options={options} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementAudSample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret(
    {
      amount: 10000,
      currency: "aud",
      payment_method_types: ["card", "au_becs_debit"],
    },
    { credentials: "auBecs" }
  );

  return { props: { clientSecret } };
};
