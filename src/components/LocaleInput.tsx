import type { StripeElementLocale } from "@stripe/stripe-js";
import { ChangeEventHandler } from "react";
import { Field } from "./Field";
import { Input } from "./Input";

import { useOptionsState, useSetOptionsState } from "./OptionsState";

export const LocaleInput = () => {
  const optionsState = useOptionsState();
  const setOptionsState = useSetOptionsState();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOptionsState({
      ...optionsState,
      locale: e.target.value as StripeElementLocale,
    });
  };

  return (
    <Field label="Locale">
      <Input value={optionsState.locale} onChange={handleChange} />
    </Field>
  );
};
