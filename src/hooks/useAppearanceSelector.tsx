import { useState, useLayoutEffect } from "react";

import { Field, Select } from "../components";
import { PAYMENT_ELEMENT_THEMES } from "../constants";

const OPTIONS = PAYMENT_ELEMENT_THEMES.map((theme) => ({
  ...theme,
  value: theme.label,
}));

export const useAppearanceSelector = (
  initialTheme: string = "None"
): [Record<string, any>, JSX.Element, Record<string, string>[]] => {
  const [theme, setTheme] = useState(initialTheme);

  const { backgroundColor, appearance, fonts } = OPTIONS.find(
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
      <Select value={theme} onChange={setTheme} options={OPTIONS} />
    </Field>
  );

  return [appearance, appearanceSelector, fonts];
};
