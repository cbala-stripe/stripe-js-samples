import { CardElement } from "@stripe/react-stripe-js";

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
import { useAppState } from "../../components/AppState";

const CardSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card"],
    },
  });

  const { locale } = useAppState(["locale"]);

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement("card"),
      },
    });
  };

  return (
    <Layout controls={<LocaleInput />}>
      <CredentialedElements options={{ locale }}>
        <ElementSample onSubmit={handleSubmit}>
          <Field label="Card details">
            <div className={INPUT_CLASSNAME}>
              <CardElement />
            </div>
          </Field>
        </ElementSample>
      </CredentialedElements>
    </Layout>
  );
};

export default CardSample;
