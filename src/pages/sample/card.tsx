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
import { useAppState, useSetAppState } from "../../components/AppState";
import { Checkbox } from "../../components/Checkbox";

const LiceCheckbox = () => {
  const { enableLiceBetas } = useAppState(["enableLiceBetas"]);
  const setAppState = useSetAppState();

  const handleChange = (value: boolean) => {
    setAppState("enableLiceBetas", value);

    setTimeout(() => {
      location.reload();
    }, 200);
  };

  return (
    <Field label="Link betas">
      <Checkbox checked={enableLiceBetas} onChange={handleChange} />
    </Field>
  );
};

const CardSample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["card"],
    },
  });

  const { locale, enableLiceBetas } = useAppState([
    "locale",
    "enableLiceBetas",
  ]);

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement("card"),
      },
    });
  };

  return (
    <Layout
      controls={
        <>
          <LocaleInput />
          <LiceCheckbox />
        </>
      }
    >
      <CredentialedElements
        options={{ locale }}
        stripeOptions={{
          betas: enableLiceBetas
            ? [
                "link_in_card_element_beta_1",
                "link_in_card_element_returning_user_beta_1",
              ]
            : [],
        }}
      >
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
