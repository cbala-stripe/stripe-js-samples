import { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
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
import { LocaleInput } from "../../components/LocaleInput";
import { useAppState, useSetAppState } from "../../components/AppState";
import { Checkbox } from "../../components/Checkbox";

const Fields = () => {
  const { showPostalCodeElement } = useAppState(["showPostalCodeElement"]);

  const elements = useElements();

  // React Stripe.js doesn't have a <PostalCodeElement />
  const [postalCodeRef, setPostalCodeRef] = useState(null);
  useEffect(() => {
    if (!postalCodeRef || !elements) {
      return () => {};
    }

    const postalCodeElement = elements.create("postalCode" as any);
    postalCodeElement.mount(postalCodeRef);

    return () => {
      postalCodeElement.destroy();
    };
  }, [postalCodeRef, elements]);

  return (
    <>
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
      {showPostalCodeElement && (
        <Field label="Postal Code">
          <div ref={setPostalCodeRef} className={INPUT_CLASSNAME} />
        </Field>
      )}
    </>
  );
};

const SplitCardSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card"],
    },
  });

  const { locale, showPostalCodeElement } = useAppState([
    "locale",
    "showPostalCodeElement",
  ]);
  const setAppState = useSetAppState();

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
            <Checkbox
              checked={showPostalCodeElement}
              onChange={(value) => setAppState("showPostalCodeElement", value)}
            />
          </Field>
        </>
      }
    >
      <CredentialedElements options={{ locale }}>
        <ElementSample onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <Fields />
          </div>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default SplitCardSample;
