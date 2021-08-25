export const INPUT_CLASSNAME =
  "block border border-gray-400 py-2 px-3 mt-1 rounded text-sm w-full max-w-sm";

export const LABEL_CLASSNAME = "block text-xs uppercase font-medium";

export const PAGES = [
  {
    title: "Card Element",
    href: "/sample/card",
  },
  {
    title: "Split Card Elements",
    href: "/sample/split-card",
  },
  {
    title: "Payment Request Button Element",
    href: "/sample/payment-request-button",
  },
  {
    title: "iDEAL Bank Element",
    href: "/sample/ideal",
  },
  {
    title: "IBAN Element",
    href: "/sample/iban",
  },
  {
    title: "FPX Bank Element",
    href: "/sample/fpx",
  },
  {
    title: "WeChat Pay",
    href: "/sample/wechat-pay",
  },
  {
    title: "AU Bank Account Element",
    href: "/sample/au-bank-account",
  },
  {
    title: "OXXO",
    href: "/sample/oxxo",
  },
  {
    title: "Konbini",
    href: "/sample/konbini",
  },
  {
    title: "Payment Element (EUR, PaymentIntent)",
    href: "/sample/payment-element",
  },
  {
    title: "Payment Element (EUR, PaymentIntent, Connect)",
    href: "/sample/payment-element-connect",
  },
  {
    title: "Payment Element (EUR, SetupIntent)",
    href: "/sample/payment-element-setup-intent",
  },
  {
    title: "Payment Element (MXN, PaymentIntent)",
    href: "/sample/payment-element-mxn",
  },
  {
    title: "Payment Element (JPY, PaymentIntent)",
    href: "/sample/payment-element-jpy",
  },
  {
    title: "Payment Element (AUD, PaymentIntent)",
    href: "/sample/payment-element-aud",
  },
  {
    title: "Payment Element (AUD, SetupIntent)",
    href: "/sample/payment-element-aud-setup-intent",
  },
  {
    title: "Payment Element (USD, PaymentIntent)",
    href: "/sample/payment-element-usd",
  },
  {
    title: "Payment Element (USD, SetupIntent)",
    href: "/sample/payment-element-usd-setup-intent",
  },
  {
    title: "Payment Element (EUR, PaymentIntent, beta_2)",
    href: "/sample/payment-element-beta-2",
  },
];

export const CREDENTIALS = {
  default: {
    publishableKey: process.env.NEXT_PUBLIC_DEFAULT_PK,
    secretKey: process.env.DEFAULT_SK,
  },
  oxxo: {
    publishableKey: process.env.NEXT_PUBLIC_OXXO_PK,
    secretKey: process.env.OXXO_SK,
  },
  fpx: {
    publishableKey: process.env.NEXT_PUBLIC_FPX_PK,
    secretKey: process.env.FPX_SK,
  },
  auBecs: {
    publishableKey: process.env.NEXT_PUBLIC_AU_BECS_DEBIT_PK,
    secretKey: process.env.AU_BECS_DEBIT_SK,
  },
  konbini: {
    publishableKey: process.env.NEXT_PUBLIC_KONBINI_PK,
    secretKey: process.env.KONBINI_SK,
    apiVersion: "2020-08-27; konbini_beta=v2",
  },
  usBankAccount: {
    publishableKey: process.env.NEXT_PUBLIC_US_BANK_ACCOUNT_PK,
    secretKey: process.env.US_BANK_ACCOUNT_SK,
    apiVersion: "2020-08-27; us_bank_account_beta=v1",
  },
  connect: {
    publishableKey: process.env.NEXT_PUBLIC_CONNECT_PK,
    secretKey: process.env.CONNECT_SK,
    stripeAccount: process.env.NEXT_PUBLIC_CONNECT_CONNECTED_ACCOUNT_ID,
  },
  paypal: {
    publishableKey: process.env.NEXT_PUBLIC_PAYPAL_PK,
    secretKey: process.env.PAYPAL_SK,
  },
};

export type CredentialsKey = keyof typeof CREDENTIALS;

export { PAYMENT_ELEMENT_THEMES } from "./paymentElementThemes";
