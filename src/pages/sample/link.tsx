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
  useAppearanceSelector,
  useClientSecret,
  useLocaleSelector,
} from "../../hooks";

const PaymentElementSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "link",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card", "link"],
    },
  });

  const [appearance, appearanceSelector, fonts] = useAppearanceSelector();
  const [locale, localeSelector] = useLocaleSelector();

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
          {appearanceSelector}
          {localeSelector}
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
