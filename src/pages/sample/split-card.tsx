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

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement("cardNumber") },
    });
  };

  return (
    <Layout controls={<LocaleInput />}>
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
          </div>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default SplitCardSample;
