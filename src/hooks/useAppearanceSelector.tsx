import { useState, useLayoutEffect } from "react";

import { Field, Select } from "../components";
import * as paymentElementThemes from "../constants/paymentElementThemes";

const THEMES = [
  {
    label: "None",
    value: "None",
    theme: { backgroundColor: "#fff", appearance: {} },
  },
  {
    label: "Stripe",
    value: "Stripe",
    theme: paymentElementThemes.STRIPE,
  },
  {
    label: "Bubblegum",
    value: "Bubblegum",
    theme: paymentElementThemes.BUBBLEGUM,
  },
  {
    label: "Dark",
    value: "Dark",
    theme: paymentElementThemes.DARK,
  },
  {
    label: "Minimal",
    value: "Minimal",
    theme: paymentElementThemes.MINIMAL,
  },
  {
    label: "98",
    value: "98",
    theme: paymentElementThemes.WINDOWS,
  },
];

export const useAppearanceSelector = (): [Record<string, any>, JSX.Element] => {
  const [theme, setTheme] = useState("None");

  const {
    // @ts-ignore
    theme: { backgroundColor, appearance },
  } = THEMES.find((t) => t.value === theme);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [backgroundColor]);

  const appearanceSelector = (
    <Field label="Theme">
      <Select value={theme} onChange={setTheme} options={THEMES} />
    </Field>
  );

  return [appearance, appearanceSelector];
};
