import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { CredentialedElements, Field, Layout, Select } from "../../components";
import { useAppState, useSetAppState } from "../../components/AppState";
import { useDebugElement } from "../../hooks";

const EceControls = () => {
  const state = useAppState(["layout"]);
  const setAppState = useSetAppState();

  return (
    <>
      <Field label="layout">
        <Select
          value={state.layout}
          options={[
            { value: "auto", label: "auto" },
            { value: "horizontal", label: "horizontal" },
            { value: "vertical", label: "vertical" },
          ]}
          onChange={(value) => setAppState("layout", value)}
        />
      </Field>
    </>
  );
};

const Container = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [resultElement, setResult] = useDebugElement();

  const handleConfirm = async () => {
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setResult(submitError);
    }

    const intentResp = await fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intentType: "payment",
        credentials: "default",
        intentParameters: {
          currency: "usd",
          automatic_payment_methods: { enabled: true },
        },
      }),
    });

    const { clientSecret } = await intentResp.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/status`,
      },
    });

    if (error) {
      setResult(error);
    }
  };

  const { layout } = useAppState(["layout"]);

  return (
    <>
      <ExpressCheckoutElement
        options={{ layout: layout as any }}
        onConfirm={handleConfirm}
      />
      {resultElement}
    </>
  );
};

const ExpressCheckoutElementSample = () => {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
  };

  return (
    <Layout controls={<EceControls />}>
      <CredentialedElements
        options={options}
        stripeOptions={{ betas: ["express_checkout_element_beta_1"] }}
      >
        <Container />
      </CredentialedElements>
    </Layout>
  );
};

export default ExpressCheckoutElementSample;
