import { PaymentElement } from "@stripe/react-stripe-js";
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
import { useClientSecret } from "../../hooks";

import {
  AppearanceDropdown,
  useAppearanceOption,
} from "../../components/AppearanceDropdown";
import { LocaleInput } from "../../components/LocaleInput";

import type { IntentRequest } from "../api/intent";
import { useAppState, useSetAppState } from "../../components/AppState";

type PaymentElementConfig = {
  label: string;
  request: IntentRequest;
};

export const PAYMENT_ELEMENT_CONFIGS: Array<PaymentElementConfig> = [
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
      credentials: "default",
      attachNewCustomer: true,
      intentParameters: {
        currency: "usd",
        payment_method_types: [
          "card",
          "afterpay_clearpay",
          "alipay",
          "us_bank_account",
          "affirm",
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
  {
    label: "SGD, PaymentIntent",
    request: {
      intentType: "payment",
      credentials: "default",
      attachNewCustomer: true,
      intentParameters: {
        currency: "usd",
        payment_method_types: ["card", "wechat_pay"],
      },
    },
  },
];

const OPTIONS = PAYMENT_ELEMENT_CONFIGS.map((config) => ({
  ...config,
  value: config.label,
}));

const PaymentElementSample = () => {
  const { paymentElementConfig, locale } = useAppState([
    "paymentElementConfig",
    "locale",
  ]);

  const config = PAYMENT_ELEMENT_CONFIGS.find(
    (d) => d.label === paymentElementConfig
  );

  const clientSecret = useClientSecret(config.request);

  const { appearance, fonts } = useAppearanceOption();

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

  const setAppState = useSetAppState();

  return (
    <Layout
      controls={
        <>
          <Field label="Scenario">
            <Select
              value={config.label}
              onChange={(paymentElementConfig) =>
                setAppState("paymentElementConfig", paymentElementConfig)
              }
              options={OPTIONS}
            />
          </Field>
          <AppearanceDropdown />
          <LocaleInput />
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
