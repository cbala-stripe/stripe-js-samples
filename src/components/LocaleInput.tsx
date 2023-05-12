import type { StripeElementLocale } from "@stripe/stripe-js";
import { ChangeEventHandler } from "react";
import { useAppState, useSetAppState } from "./AppState";
import { Field } from "./Field";
import { Input } from "./Input";

export const LocaleInput = () => {
  const { locale } = useAppState(["locale"]);
  const setAppState = useSetAppState();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAppState("locale", e.target.value as StripeElementLocale);
  };

  return (
    <Field label="Locale">
      <Input value={locale} onChange={handleChange} />
    </Field>
  );
};
