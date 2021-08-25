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

const PaymentElementSetupIntentSample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmSetup({
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
        stripeOptions={{ betas: ["payment_element_beta_1"] }}
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

export default PaymentElementSetupIntentSample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret("setup", {
    payment_method_types: [
      "bancontact",
      "card",
      "ideal",
      "sepa_debit",
      "sofort",
    ],
  });

  return { props: { clientSecret } };
};
