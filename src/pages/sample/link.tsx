import {
  PaymentElement,
  LinkAuthenticationElement,
  ShippingAddressElement,
} from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import {
  AppearanceDropdown,
  useAppearanceOption,
} from "../../components/AppearanceDropdown";
import { LocaleInput } from "../../components/LocaleInput";
import { useOptionsState } from "../../components/OptionsState";
import { useClientSecret } from "../../hooks";

const PaymentElementSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "link",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card", "link"],
    },
  });

  const { locale } = useOptionsState();
  const { appearance, fonts } = useAppearanceOption();

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });
  };

  return (
    <Layout
      controls={
        <>
          <AppearanceDropdown />
          <LocaleInput />
        </>
      }
    >
      {clientSecret && (
        <CredentialedElements
          credentials="link"
          options={{ clientSecret, appearance, fonts, locale }}
          stripeOptions={{
            betas: ["link_beta_1", "shipping_address_element_beta_1"],
          }}
        >
          <ElementSample onSubmit={handleSubmit}>
            <LinkAuthenticationElement />
            <ShippingAddressElement />
            <PaymentElement />
          </ElementSample>
        </CredentialedElements>
      )}
    </Layout>
  );
};

export default PaymentElementSample;
