import { PaymentElement } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { PAYMENT_ELEMENT_BETA_1_THEMES } from "../../constants/paymentElementThemes";
import { useAppearanceSelector, useClientSecret } from "../../hooks";

const PaymentElementBeta1Sample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
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
    },
  });

  const [appearance, appearanceSelector, fonts] = useAppearanceSelector(
    "Default",
    PAYMENT_ELEMENT_BETA_1_THEMES
  );

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      // @ts-expect-error: using the untyped beta_1 signature
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });
  };

  return (
    <Layout controls={appearanceSelector}>
      {clientSecret && (
        <CredentialedElements
          stripeOptions={{ betas: ["payment_element_beta_1"] }}
          options={{ fonts }}
        >
          <ElementSample onSubmit={handleSubmit}>
            <PaymentElement
              options={
                { clientSecret, appearance } as StripePaymentElementOptions
              }
            />
          </ElementSample>
        </CredentialedElements>
      )}
    </Layout>
  );
};

export default PaymentElementBeta1Sample;
