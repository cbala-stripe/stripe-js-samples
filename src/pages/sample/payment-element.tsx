import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  TestInstructions,
} from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";
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
        return_url: `${window.location.origin}/status?credentials=paypal`,
      },
    });
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.value.type);
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        credentials="paypal"
        stripeOptions={{
          betas: ["payment_element_beta_1"],
        }}
      >
        <ElementSample onSubmit={handleSubmit}>
          <TestInstructions paymentMethod={selectedPaymentMethod} />
          {/* @ts-ignore */}
          <PaymentElement options={options} onChange={handleChange} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementSample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret(
    "payment",
    {
      amount: 999,
      currency: "eur",
      payment_method_types: [
        "bancontact",
        "card",
        "eps",
        "giropay",
        "ideal",
        "p24",
        "sepa_debit",
        "sofort",
        "paypal",
      ],
    },
    {
      credentials: "paypal",
    }
  );

  return { props: { clientSecret } };
};
