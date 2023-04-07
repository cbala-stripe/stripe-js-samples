import Stripe from "stripe";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";

import { getCredentials } from "../../helpers/getCredentials";

const SetupAchPaymentDetailsSample = ({ clientSecret }) => {
  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
    return stripe.collectBankAccountForSetup({
      clientSecret: clientSecret,
      params: {
        payment_method_type: "us_bank_account",
        payment_method_data: {
          billing_details: { name, email },
        },
      },
      expand: ["payment_method"],
    });
  };

  return (
    <Layout>
      <CredentialedElements>
        <ElementSample onSubmit={handleSubmit} collectNameAndEmail />
      </CredentialedElements>
    </Layout>
  );
};

export default SetupAchPaymentDetailsSample;

export const getServerSideProps = async () => {
  const stripe = new Stripe(getCredentials("default").secretKey, {
    apiVersion: "2022-11-15",
  });

  const customer = await stripe.customers.create({
    name: "Christopher (stripe-js-samples)",
    email: "christopher@stripe.com",
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ["us_bank_account"],
    payment_method_options: {
      us_bank_account: {
        financial_connections: { permissions: ["payment_method", "balances"] },
      },
    },
  });

  return { props: { clientSecret: setupIntent.client_secret } };
};
