import qs from "qs";
import type { StripeElementLocale } from "@stripe/stripe-js";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { APPEARANCE_OPTIONS } from "../constants/appearanceOptions";
import { PAYMENT_ELEMENT_CONFIGS } from "../pages/sample/payment-element";
import { getStripeJsUrlAlias } from "./WithStripeJs";

type AppState = {
  locale: StripeElementLocale;
  appearance: string;
  betas: string[];
  stripeJsUrl: "prod" | "edge" | "localhost" | string;
  paymentElementConfig: string;
  sampleWidth: number | "full";
};

const DEFAULT_APP_STATE: AppState = {
  locale: "auto",
  appearance: APPEARANCE_OPTIONS[0].label,
  betas: [],
  stripeJsUrl: getStripeJsUrlAlias(process.env.NEXT_PUBLIC_STRIPE_JS_URL),
  paymentElementConfig: PAYMENT_ELEMENT_CONFIGS[0].label,
  sampleWidth: "full",
};

const AppStateContext = createContext(null);

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>(null);

  // Read options state from query params on initial load
  useEffect(() => {
    const queryParamData = qs.parse(window.location.search.slice(1));
    const initialAppState = { ...DEFAULT_APP_STATE };

    for (const key of Object.keys(queryParamData)) {
      if (key in DEFAULT_APP_STATE) {
        initialAppState[key] = queryParamData[key];
      }
    }

    setAppState(initialAppState);

    // TODO: Clear query params, probably?
  }, []);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {appState && children}
    </AppStateContext.Provider>
  );
};

const appStateKeysInUse: { [appStateKey: string]: number } = {};

// lol
export const useAppState = <T extends Array<keyof AppState>>(
  keys: T
): { [K in T[number]]: AppState[K] } => {
  const { appState } = useContext(AppStateContext);

  // Track what keys are currently being used from app state
  useEffect(() => {
    for (const k of keys) {
      if (!appStateKeysInUse[k]) {
        appStateKeysInUse[k] = 0;
      }

      appStateKeysInUse[k] += 1;
    }

    return () => {
      for (const k of keys) {
        appStateKeysInUse[k] -= 1;
      }
    };
  }, [keys]);

  // For keys with non-default values currently in use, store the keys as a query param
  useEffect(() => {
    const queryParams = qs.parse(window.location.search.slice(1));

    // Add app state keys in use that are not the default value
    for (const k of Object.keys(appStateKeysInUse)) {
      if (appStateKeysInUse[k] && queryParams[k] !== DEFAULT_APP_STATE[k]) {
        queryParams[k] = appState[k];
      }
    }

    // Delete app state keys not in use or app state keys in use that are the default value
    for (const k of Object.keys(queryParams)) {
      if (
        k in DEFAULT_APP_STATE &&
        (!appStateKeysInUse[k] || queryParams[k] === DEFAULT_APP_STATE[k])
      ) {
        delete queryParams[k];
      }
    }

    // Update the query params (preserving any existing query params not related to app state)
    const url = new URL(window.location.href);
    url.search = qs.stringify(queryParams);
    window.history.replaceState(null, "", url.toString());

    // Remove query params no longer needed on unmount
    return () => {
      const queryParams = qs.parse(window.location.search.slice(1));

      for (const k of Object.keys(queryParams)) {
        if (
          k in DEFAULT_APP_STATE &&
          (!appStateKeysInUse[k] || queryParams[k] === DEFAULT_APP_STATE[k])
        ) {
          delete queryParams[k];
        }
      }

      const url = new URL(window.location.href);
      url.search = qs.stringify(queryParams);
      window.history.replaceState(null, "", url.toString());
    };
  });

  const result = {} as { [K in T[number]]: AppState[K] };
  for (const k of keys) {
    result[k] = appState[k];
  }

  return result;
};

export const useSetAppState = <K extends keyof AppState>(): ((
  key: K,
  value: AppState[K]
) => void) => {
  const { appState, setAppState } = useContext(AppStateContext);

  const set = useCallback(
    (key, value) => {
      setAppState({ ...appState, [key]: value });
    },
    [appState, setAppState]
  );

  return set;
};
