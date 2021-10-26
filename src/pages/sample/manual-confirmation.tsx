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
import { INPUT_CLASSNAME } from "../../constants";

const ManualConfirmationSample = () => {
  // https://stripe.com/docs/payments/accept-a-payment-synchronously
  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    const { paymentMethod, error: createPaymentMethodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("cardNumber"),
      });

    if (createPaymentMethodError) {
      return createPaymentMethodError;
    }

    const firstFinalizeResp = await fetch("/api/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    const firstFinalizeRespBody = await firstFinalizeResp.json();

    if (!firstFinalizeResp.ok) {
      return firstFinalizeResp;
    }

    const { clientSecret, status, nextActionType } = firstFinalizeRespBody;

    if (status === "succeeded") {
      return stripe.retrievePaymentIntent(clientSecret);
    }

    if (status !== "requires_action" || nextActionType !== "use_stripe_sdk") {
      throw new Error(
        `Unexpected status "${status}" or unexpected nextActionType "${nextActionType}"`
      );
    }

    const { paymentIntent, error: handleCardActionError } =
      await stripe.handleCardAction(clientSecret);

    if (handleCardActionError) {
      return handleCardActionError;
    }

    const secondFinalizeResp = await fetch("/api/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
    });

    const secondFinalizeRespBody = await secondFinalizeResp.json();

    if (!secondFinalizeResp.ok) {
      return secondFinalizeRespBody;
    }

    return stripe.retrievePaymentIntent(clientSecret);
  };

  return (
    <Layout>
      <CredentialedElements>
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
          </div>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default ManualConfirmationSample;
