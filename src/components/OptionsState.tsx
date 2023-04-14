import { StripeElementLocale } from "@stripe/stripe-js";
import { createContext, useContext, useState } from "react";

import {
  AppearanceOption,
  APPEARANCE_OPTIONS,
} from "../constants/appearanceOptions";

type OptionsState = {
  locale: StripeElementLocale;
  appearanceOption: AppearanceOption;
  betas: string[];
  stripeJsUrl: string;
};

const INITIAL_OPTIONS_STATE: OptionsState = {
  locale: "auto",
  appearanceOption: APPEARANCE_OPTIONS[0],
  betas: [],
  stripeJsUrl: process.env.NEXT_PUBLIC_STRIPE_JS_URL,
};

const OptionsStateContext = createContext(null);

export const OptionsState = ({ children }: { children: React.ReactNode }) => {
  const [optionsState, setOptionsState] = useState<OptionsState>(
    INITIAL_OPTIONS_STATE
  );

  return (
    <OptionsStateContext.Provider value={{ optionsState, setOptionsState }}>
      {children}
    </OptionsStateContext.Provider>
  );
};

export const useOptionsState = (): OptionsState => {
  return useContext(OptionsStateContext).optionsState;
};

export const useSetOptionsState = (): ((newState: OptionsState) => void) => {
  return useContext(OptionsStateContext).setOptionsState;
};
