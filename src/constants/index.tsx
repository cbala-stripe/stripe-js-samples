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
    title: "Raw Card Details",
    href: "/sample/raw-create-payment-method",
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
    title: "Payment Element (PaymentIntent)",
    href: "/sample/payment-element-payment-intent",
  },
  {
    title: "Payment Element (SetupIntent)",
    href: "/sample/payment-element-setup-intent",
  },
  {
    title: "Payment Element (PaymentIntent + Connect)",
    href: "/sample/payment-element-payment-intent-connect",
  },
  {
    title: "Payment Element (SetupIntent + Connect)",
    href: "/sample/payment-element-setup-intent-connect",
  },
];

export const INPUT_CLASSNAME =
  "block border border-gray-400 py-2 px-3 mt-1 rounded text-sm w-full max-w-sm";

export const LABEL_CLASSNAME = "block text-xs uppercase font-medium";

export const CURRENT_STRIPE_JS_URL =
  typeof window !== "undefined"
    ? window.localStorage.getItem("stripeJsUrl")
    : "https://js.stripe.com/v3/";
