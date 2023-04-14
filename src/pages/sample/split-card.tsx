import { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  Field,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";
import { INPUT_CLASSNAME } from "../../constants";
import { useOptionsState } from "../../components/OptionsState";
import { LocaleInput } from "../../components/LocaleInput";

const SplitCardSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card"],
    },
  });

  const { locale } = useOptionsState();

  const [showPostalCode, setShowPostalCode] = useState(false);

  // React Stripe.js doesn't have a <PostalCodeElement />
  const [postalCodeRef, setPostalCodeRef] = useState(null);
  useEffect(() => {
    if (!postalCodeRef) {
      return () => {};
    }

    const postalCodeElement = (window as any).elements.create("postalCode");
    postalCodeElement.mount(postalCodeRef);

    return () => {
      postalCodeElement.destroy();
    };
  });

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement("cardNumber") },
    });
  };

  return (
    <Layout
      controls={
        <>
          <LocaleInput />
          <Field label="Postal Code Element">
            <input
              type="checkbox"
              className="mt-2"
              checked={showPostalCode}
              onChange={() => setShowPostalCode(!showPostalCode)}
            />
          </Field>
        </>
      }
    >
      <CredentialedElements options={{ locale }}>
        <ElementSample onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <Field label="Card number">
              <div className={INPUT_CLASSNAME}>
                <CardNumberElement />
              </div>
            </Field>
            <Field label="Expiry">
              <div className={INPUT_CLASSNAME}>
                <CardExpiryElement />
              </div>
            </Field>
            <Field label="CVC">
              <div className={INPUT_CLASSNAME}>
                <CardCvcElement />
              </div>
            </Field>
            {showPostalCode && (
              <Field label="Postal Code">
                <div ref={setPostalCodeRef} className={INPUT_CLASSNAME} />
              </Field>
            )}
          </div>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default SplitCardSample;
