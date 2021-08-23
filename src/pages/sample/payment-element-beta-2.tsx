import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  TestInstructions,
} from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementBeta2Sample = ({ clientSecret }) => {
  const [appearance, appearanceSelector, fonts] =
    useAppearanceSelector("VT323");

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status`,
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
        stripeOptions={{ betas: ["payment_element_beta_2"] }}
        options={{ clientSecret, appearance, fonts } as any}
      >
        <ElementSample onSubmit={handleSubmit}>
          <TestInstructions paymentMethod={selectedPaymentMethod} />
          {/* @ts-ignore */}
          <PaymentElement onChange={handleChange} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementBeta2Sample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret({
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
    ],
  });

  return { props: { clientSecret } };
};
