import { useState, useEffect } from "react";

import { useDebugElement } from "../../hooks/useDebugElement";
import { Layout } from "../../components/Layout";
import { Field, Select } from "../../components";
import { getStripePromise } from "../../helpers/getStripePromise";

const THEME_OPTIONS = [
  { value: "dark", label: "dark" },
  { value: "light", label: "light" },
  { value: "light-outline", label: "light-outline" },
];

const TYPE_OPTIONS = [
  { value: "default", label: "default" },
  { value: "book", label: "book" },
  { value: "buy", label: "buy" },
  { value: "donate", label: "donate" },
  { value: "check-out", label: "check-out" },
  { value: "subscribe", label: "subscribe" },
  { value: "reload", label: "reload" },
  { value: "add-money", label: "add-money" },
  { value: "top-up", label: "top-up" },
  { value: "order", label: "order" },
  { value: "rent", label: "rent" },
  { value: "support", label: "support" },
  { value: "contribute", label: "contribute" },
  { value: "tip", label: "tip" },
];

const PaymentRequestButtonSample = ({ clientSecret }) => {
  const [ref, setRef] = useState(null);
  const [resultElement, setResult] = useDebugElement();
  const [theme, setTheme] = useState(THEME_OPTIONS[0].value);
  const [type, setType] = useState(TYPE_OPTIONS[0].value);

  useEffect(() => {
    if (!ref) {
      return;
    }

    getStripePromise("default").then((stripe) => {
      const elements = stripe.elements();

      const paymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: { label: "Demo total", amount: 100 },
      });

      // @ts-expect-error -- dunno
      const paymentRequestButton = elements.create("paymentRequestButton", {
        paymentRequest: paymentRequest,
        style: {
          paymentRequestButton: { type, theme },
        },
      });

      paymentRequest.canMakePayment().then((result) => {
        setResult(
          `canMakePayment result: ${
            result === null
              ? "null"
              : `\n\n${JSON.stringify(result, null, "  ")}`
          }`
        );

        if (result) {
          paymentRequestButton.mount(ref);
        }
      });

      paymentRequest.on("paymentmethod", (e) => {
        e.complete("success");
        setResult(e);
      });

      return () => {
        paymentRequestButton.destroy();
      };
    });
  }, [ref, setResult, theme, type]);

  return (
    <Layout
      controls={
        <>
          <Field label="type">
            <Select value={type} onChange={setType} options={TYPE_OPTIONS} />
          </Field>
          <Field label="theme">
            <Select value={theme} onChange={setTheme} options={THEME_OPTIONS} />
          </Field>
        </>
      }
    >
      <div className="mb-6" ref={setRef} />
      {resultElement}
    </Layout>
  );
};

export default PaymentRequestButtonSample;
