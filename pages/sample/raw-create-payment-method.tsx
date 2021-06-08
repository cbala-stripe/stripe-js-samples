import { CardElement } from "@stripe/react-stripe-js";

import { ElementSample } from "../../components/ElementSample";

const RawCreatePaymentMethodSample = () => {
  const handleSubmit = async ({ stripe }) => {
    return stripe.createPaymentMethod({
      type: "card",
      card: {
        number: "4242424242424242",
        cvc: "123",
        exp_month: "12",
        exp_year: "2050",
      },
      billing_details: {
        name: "Jane Doe",
        email: "jenny.rosen@example.com",
        address: {
          postal_code: "12345",
        },
      },
    });
  };

  return <ElementSample onSubmit={handleSubmit} collectNameAndEmail={false} />;
};

export default RawCreatePaymentMethodSample;
