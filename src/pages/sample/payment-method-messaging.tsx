import { PaymentMethodMessagingElement } from "@stripe/react-stripe-js";

import { CredentialedElements, Layout } from "../../components";
import { AttachStripeGlobals } from "../../hooks/useStripeGlobals";

const PaymentMethodMessagingSample = () => {
  return (
    <Layout>
      <CredentialedElements stripeOptions={{ betas: ["ume_beta_2"] }}>
        <AttachStripeGlobals>
          <PaymentMethodMessagingElement
            options={{
              amount: 100000,
              currency: "USD",
              paymentMethods: ["affirm", "klarna", "afterpay_clearpay"],
              countryCode: "US",
            }}
          />
        </AttachStripeGlobals>
      </CredentialedElements>
    </Layout>
  );
};

export default PaymentMethodMessagingSample;
