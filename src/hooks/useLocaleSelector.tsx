import { useState } from "react";
import { StripeElementLocale } from "@stripe/stripe-js";

import { Field, Input } from "../components";

export const useLocaleSelector = (
  initialLocale: string = "auto"
): [StripeElementLocale, JSX.Element] => {
  const [locale, setLocale] = useState(initialLocale);

  const input = (
    <Field label="Locale">
      <Input value={locale} onChange={(e) => setLocale(e.target.value)} />
    </Field>
  );

  return [locale as StripeElementLocale, input];
};
