import { PaymentElement } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { PAYMENT_ELEMENT_BETA_1_THEMES } from "../../constants/appearanceOptions";
import { useClientSecret } from "../../hooks";

import {
  AppearanceDropdown,
  useAppearanceOption,
} from "../../components/AppearanceDropdown";
import { LocaleInput } from "../../components/LocaleInput";
import { useAppState } from "../../components/AppState";

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

  const { locale } = useAppState(["locale"]);

  const { appearance, fonts } = useAppearanceOption();

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
    <Layout
      controls={
        <>
          <AppearanceDropdown options={PAYMENT_ELEMENT_BETA_1_THEMES} />
          <LocaleInput />
        </>
      }
    >
      {clientSecret && (
        <CredentialedElements
          stripeOptions={{ betas: ["payment_element_beta_1"] }}
          options={{ locale, fonts }}
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
