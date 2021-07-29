import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  List,
} from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";
import { useAppearanceSelector } from "../../hooks/useAppearanceSelector";

const PaymentElementSample = ({ clientSecret }) => {
  const [appearance, appearanceSelector] = useAppearanceSelector();

  const options = {
    clientSecret,
    appearance,
    business: { name: "foo" },
  };

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
        stripeOptions={{ betas: ["payment_element_beta_1"] }}
      >
        <ElementSample onSubmit={handleSubmit}>
          {selectedPaymentMethod === "sepa_debit" && (
            <List>
              <List.Item>
                Test success IBAN: <code>AT61 1904 3002 3457 3201</code>
              </List.Item>
              <List.Item>
                Test failure IBAN: <code>AT86 1904 3002 3547 3202</code>
              </List.Item>
            </List>
          )}
          {/* @ts-ignore */}
          <PaymentElement options={options} onChange={handleChange} />
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentElementSample;

export const getServerSideProps = async () => {
  const clientSecret = await getPaymentIntentClientSecret({
    amount: 999,
    currency: "eur",
    payment_method_types: [
      "card",
      "ideal",
      "bancontact",
      "eps",
      "giropay",
      "p24",
      "sofort",
      "sepa_debit",
    ],
  });

  return { props: { clientSecret } };
};
