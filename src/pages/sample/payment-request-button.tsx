import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { useDebugElement } from "../../hooks/useDebugElement";
import { Layout } from "../../components/Layout";
import { getCredentials } from "../../helpers/getCredentials";

const PaymentRequestButtonSample = ({ clientSecret }) => {
  const [ref, setRef] = useState(null);
  const [resultElement, setResult] = useDebugElement();

  useEffect(() => {
    if (!ref) {
      return;
    }

    loadStripe(getCredentials("default").publishableKey).then((stripe) => {
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
  }, [ref, setResult]);

  return (
    <Layout>
      <div className="mb-6" ref={setRef} />
      {resultElement}
    </Layout>
  );
};

export default PaymentRequestButtonSample;
