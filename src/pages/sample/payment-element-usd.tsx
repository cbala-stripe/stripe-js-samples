import { PaymentElement } from "@stripe/react-stripe-js";

import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementSample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status`,
        shipping: {
          name: "Jenny Rosen",
          address: {
            city: "San Francisco",
            country: "US",
            line1: "510 Townsend Street",
            line2: null,
            postal_code: "94103",
            state: "CA",
          },
        },
      },
    });
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        stripeOptions={{ betas: ["payment_element_beta_1"] }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <PaymentElement options={options} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementSample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret({
    amount: 999,
    currency: "usd",
    payment_method_types: ["card", "afterpay_clearpay", "alipay"],
  });

  return { props: { clientSecret } };
};
