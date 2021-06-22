import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import { useDebugElement } from "../hooks/useDebugElement";
import { Layout } from "../components/Layout";
import { CredentialedElements } from "../components/CredentialedElements";

const Status = () => {
  const stripe = useStripe();
  const [resultElement, setResult] = useDebugElement();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    const paymentIntentClientSecret = searchParams.get(
      "payment_intent_client_secret"
    );

    const setupIntentClientSecret = searchParams.get(
      "setup_intent_client_secret"
    );

    if (paymentIntentClientSecret) {
      stripe.retrievePaymentIntent(paymentIntentClientSecret).then(setResult);
    } else if (setupIntentClientSecret) {
      stripe.retrieveSetupIntent(setupIntentClientSecret).then(setResult);
    } else {
      throw new Error("Expected client secret query parameter but found none");
    }
  }, [stripe]);

  return resultElement;
};

const StatusPage = () => {
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const credentials = searchParams.get("credentials") ?? "default";

    setCredentials(credentials);
  }, []);

  return (
    <Layout>
      <div className="mt-6">
        {credentials && (
          <CredentialedElements credentials={credentials}>
            <Status />
          </CredentialedElements>
        )}
      </div>
    </Layout>
  );
};

export default StatusPage;
