import qs from "qs";
import { StripeElementLocale } from "@stripe/stripe-js";
import { createContext, useContext, useState, useEffect } from "react";

import { APPEARANCE_OPTIONS } from "../constants/appearanceOptions";
import { PAYMENT_ELEMENT_CONFIGS } from "../pages/sample/payment-element";

type OptionsState = {
  locale: StripeElementLocale;
  appearance: string;
  betas: string[];
  stripeJsUrl: string;
  paymentElementConfig: string;
};

const DEFAULT_OPTIONS_STATE: OptionsState = {
  locale: "auto",
  appearance: APPEARANCE_OPTIONS[0].label,
  betas: [],
  stripeJsUrl: process.env.NEXT_PUBLIC_STRIPE_JS_URL,
  paymentElementConfig: PAYMENT_ELEMENT_CONFIGS[0].label,
};

const OptionsStateContext = createContext(null);

export const OptionsState = ({ children }: { children: React.ReactNode }) => {
  const [optionsState, setOptionsState] = useState<OptionsState>(null);

  // Read options state from query params on initial load
  useEffect(() => {
    const url = new URL(window.location.href);

    const initialOptionsState = {
      ...DEFAULT_OPTIONS_STATE,
      ...(qs.parse(url.search) as OptionsState), // TODO: Validate
    };

    setOptionsState(initialOptionsState);
  }, []);

  // Update query params according to option state
  useEffect(() => {
    if (!optionsState) {
      return;
    }

    const url = new URL(window.location.href);
    url.search = qs.stringify(optionsState);
    window.history.replaceState(null, "", url.toString());
  }, [optionsState]);

  return (
    <OptionsStateContext.Provider value={{ optionsState, setOptionsState }}>
      {optionsState && children}
    </OptionsStateContext.Provider>
  );
};

export const useOptionsState = (): OptionsState => {
  return useContext(OptionsStateContext).optionsState;
};

export const useSetOptionsState = (): ((newState: OptionsState) => void) => {
  return useContext(OptionsStateContext).setOptionsState;
};
