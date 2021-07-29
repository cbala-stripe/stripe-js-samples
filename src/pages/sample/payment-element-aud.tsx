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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.value.type);
  };

  return (
    <Layout controls={appearanceSelector}>
      <CredentialedElements
        credentials="auBecs"
        stripeOptions={{ betas: ["payment_element_beta_1"] }}
      >
        <ElementSample onSubmit={handleSubmit}>
          {selectedPaymentMethod === "au_becs_debit" && (
            <List>
              <List.Item>
                Test BSB number: <code>000-000</code>
              </List.Item>
              <List.Item>
                Test success account number: <code>000123456</code>
              </List.Item>
              <List.Item>
                Test failure account number: <code>111111113</code>
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
