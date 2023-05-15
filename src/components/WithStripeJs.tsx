import Script from "next/script";
import { useRef } from "react";

import { useAppState } from "./AppState";

export const getStripeJsUrlAlias = (url: string): string => {
  switch (url) {
    case "https://js.stripe.com/v3":
    case "https://js.stripe.com/v3/":
      return "prod";
    case "https://edge-js.stripe.com/v3":
    case "https://edge-js.stripe.com/v3/":
      return "edge";
    case "http://localhost:3001/stripe.js":
    case "http://localhost:3001/v3":
    case "http://localhost:3001/v3/":
      return "localhost";
    default:
      return url;
  }
};

const getStripeJsUrlFromAlias = (alias: string): string => {
  switch (alias) {
    case "prod":
      return "https://js.stripe.com/v3/";
    case "edge":
      return "https://edge-js.stripe.com/v3/";
    case "localhost":
      return "http://localhost:3001/stripe.js";
    default:
      return alias;
  }
};

export const WithStripeJs = ({ children }: { children: React.ReactNode }) => {
  const { stripeJsUrl } = useAppState(["stripeJsUrl"]);

  // Only attempt loading the script once, with the first URL seen
  const initialUrl = useRef(stripeJsUrl);

  return (
    <>
      <Script src={getStripeJsUrlFromAlias(initialUrl.current)} />
      {children}
    </>
  );
};
