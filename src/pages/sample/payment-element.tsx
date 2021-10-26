import { PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
  Field,
  Select,
  TestInstructions,
} from "../../components";
import {
  useAppearanceSelector,
  useClientSecret,
  useLocaleSelector,
} from "../../hooks";

import type { IntentRequest } from "../api/intent";

type Config = {
  label: string;
  request: IntentRequest;
};

const CONFIGS: Array<Config> = [
  {
    label: "EUR, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "paypal",
      intentParameters: {
        currency: "eur",
        payment_method_types: [
          "bancontact",
          "card",
          "eps",
          "giropay",
          "ideal",
          "p24",
          "sepa_debit",
          "sofort",
          "paypal",
          "klarna",
        ],
      },
    },
  },
  {
    label: "EUR, PaymentIntent, Connect",
    request: {
      intentType: "payment",
      credentials: "connect",
      intentParameters: {
        currency: "eur",
        payment_method_types: [
          "bancontact",
          "card",
          "eps",
          "giropay",
          "ideal",
          "p24",
          "sepa_debit",
          "sofort",
        ],
      },
    },
  },
  {
    label: "EUR, SetupIntent, Connect",
    request: {
      intentType: "setup",
      credentials: "connect",
      intentParameters: {
        payment_method_types: [
          "bancontact",
          "card",
          "ideal",
          "sepa_debit",
          "sofort",
        ],
      },
    },
  },
  {
    label: "EUR, PaymentIntent, Automatic Payment Methods",
    request: {
      intentType: "payment",
      credentials: "automaticPaymentMethods",
      intentParameters: {
        currency: "eur",
        automatic_payment_methods: { enabled: true },
      },
    },
  },
  {
    label: "EUR, SetupIntent",
    request: {
      intentType: "setup",
      credentials: "default",
      intentParameters: {
        payment_method_types: [
          "bancontact",
          "card",
          "ideal",
          "sepa_debit",
          "sofort",
        ],
      },
    },
  },
  {
    label: "AUD, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "auBecs",
      intentParameters: {
        currency: "aud",
        payment_method_types: ["card", "au_becs_debit"],
      },
    },
  },
  {
    label: "AUD, SetupIntent",
    request: {
      intentType: "setup",
      credentials: "auBecs",
      attachNewCustomer: true,
      intentParameters: {
        payment_method_types: ["card", "au_becs_debit"],
      },
    },
  },
  {
    label: "JPY, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "konbini",
      intentParameters: {
        currency: "jpy",
        payment_method_types: ["card", "konbini"],
        payment_method_options: {
          konbini: { product_description: "Tシャツ" },
        },
      },
    },
  },
  {
    label: "MXN, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "oxxo",
      intentParameters: {
        currency: "mxn",
        payment_method_types: ["card", "oxxo"],
      },
    },
  },
  {
    label: "USD, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "usBankAccount",
      attachNewCustomer: true,
      intentParameters: {
        currency: "usd",
        payment_method_types: [
          "card",
          "afterpay_clearpay",
          "alipay",
          "us_bank_account",
        ],
      },
    },
  },
  {
    label: "USD, SetupIntent",
    request: {
      intentType: "setup",
      attachNewCustomer: true,
      credentials: "usBankAccount",
      intentParameters: {
        payment_method_types: ["card", "us_bank_account"],
      },
    },
  },
];

const CONFIG_OPTIONS = CONFIGS.map((config) => ({
  ...config,
  value: config.label,
}));

const useConfig = (): {
  config: Config;
  onChangeConfig: (configLabel: string) => void;
} => {
  const router = useRouter();
  const configQueryParam = router.query.config as string;
  const configLabel = configQueryParam ?? CONFIG_OPTIONS[0].label;
  const config = CONFIGS.find((config) => config.label === configLabel);

  const onChangeConfig = (configLabel: string) => {
    router.push({
      pathname: "/sample/payment-element",
      query: { config: configLabel },
    });
  };

  return { config, onChangeConfig };
};

const PaymentElementSample = () => {
  const { config, onChangeConfig } = useConfig();

  const clientSecret = useClientSecret(config.request);

  const [appearance, appearanceSelector, fonts] = useAppearanceSelector();
  const [locale, localeSelector] = useLocaleSelector();

  const handleSubmit: SubmitCallback = async ({ stripe, elements }) => {
    if (config.request.intentType === "payment") {
      return stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/status?credentials=${config.request.credentials}`,
        },
      });
    }

    return stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/status?credentials=${config.request.credentials}`,
      },
    });
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.value.type);
  };

  return (
    <Layout
      controls={
        <>
          <Field label="Scenario">
            <Select
              value={config.label}
              onChange={onChangeConfig}
              options={CONFIG_OPTIONS}
            />
          </Field>
          {appearanceSelector}
          {localeSelector}
        </>
      }
    >
      {clientSecret && (
        <CredentialedElements
          credentials={config.request.credentials}
          options={{ clientSecret, appearance, fonts, locale }}
        >
          <ElementSample onSubmit={handleSubmit}>
            <TestInstructions paymentMethod={selectedPaymentMethod} />
            <PaymentElement onChange={handleChange} />
          </ElementSample>
        </CredentialedElements>
      )}
    </Layout>
  );
};

export default PaymentElementSample;
