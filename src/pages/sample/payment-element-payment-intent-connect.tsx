import Stripe from "stripe";
import { PaymentElement } from "@stripe/react-stripe-js";
import { ElementSample } from "../../components/ElementSample";
import * as paymentElementThemes from "../../constants/paymentElementThemes";
import { KEYS } from "../../constants";

const PaymentElementPaymentIntentSample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements }) => {
    return stripe.confirmPayment({
      element: elements.getElement(PaymentElement),
      confirmParams: {
        return_url: `${window.location.origin}/status?account=connect`,
      },
    });
  };

  const options = {
    clientSecret,
  };

  return (
    <ElementSample
      onSubmit={handleSubmit}
      collectNameAndEmail={false}
      account="connect"
      stripeOptions={{ betas: ["payment_element_beta_1"] }}
    >
      <PaymentElement options={options} />
    </ElementSample>
  );
};

export default PaymentElementPaymentIntentSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(KEYS.connect.secretKey, {
    apiVersion: "2020-03-02",
  });

  const { client_secret: clientSecret } = await stripe.paymentIntents.create(
    {
      amount: 999,
      currency: "eur",
      payment_method_types: [
        "card",
        "ideal",
        "bancontact",
        "eps",
        "giropay",
        "p24",
        "sofort",
      ],
    },
    {
      stripeAccount: KEYS.connect.stripeAccount,
    }
  );

  return { props: { clientSecret } };
};
