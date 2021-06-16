import Stripe from "stripe";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Field } from "../../components/Field";
import { ElementSample } from "../../components/ElementSample";
import { INPUT_CLASSNAME } from "../../constants";
import { useDebugElement } from "../../hooks/useDebugElement";
import { Layout } from "../../components/Layout";

const PaymentRequestButtonSample = ({ clientSecret }) => {
  const [ref, setRef] = useState(null);
  const [resultElement, setResult] = useDebugElement();

  useEffect(() => {
    if (!ref) {
      return;
    }

    loadStripe(process.env.NEXT_PUBLIC_DEFAULT_PK).then((stripe) => {
      const elements = stripe.elements();

      const paymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: { label: "Demo total", amount: 100 },
      });

      const paymentRequestButton = elements.create("paymentRequestButton", {
        paymentRequest: paymentRequest,
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
    });
  }, [ref]);

  return (
    <Layout>
      <div className="mb-6" ref={setRef} />
      {resultElement}
    </Layout>
  );
};

export default PaymentRequestButtonSample;
