import type { CssFontSource, CustomFontSource } from "@stripe/stripe-js";
import { useState, useLayoutEffect } from "react";

import { Field, Select } from "../components";
import { PAYMENT_ELEMENT_THEMES } from "../constants";
import type { PaymentElementTheme } from "../constants";

export const useAppearanceSelector = (
  initialTheme: string = PAYMENT_ELEMENT_THEMES[0].label,
  themes: PaymentElementTheme[] = PAYMENT_ELEMENT_THEMES
): [
  Record<string, any>,
  JSX.Element,
  Array<CssFontSource | CustomFontSource>
] => {
  const options = themes.map((theme) => ({
    ...theme,
    value: theme.label,
  }));

  const [theme, setTheme] = useState(initialTheme);

  const { backgroundColor, appearance, fonts } = options.find(
    (t) => t.value === theme
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [backgroundColor]);

  const appearanceSelector = (
    <Field label="Theme">
      <Select value={theme} onChange={setTheme} options={options} />
    </Field>
  );

  return [appearance, appearanceSelector, fonts];
};
