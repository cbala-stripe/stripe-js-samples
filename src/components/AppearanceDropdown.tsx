import { Appearance } from "@stripe/stripe-js";

import { Field } from "./Field";
import { Select } from "./Select";

import { useOptionsState, useSetOptionsState } from "./OptionsState";
import { APPEARANCE_OPTIONS } from "../constants/appearanceOptions";
import { useLayoutEffect } from "react";
import type { AppearanceOption } from "../constants/appearanceOptions";

export const AppearanceDropdown = ({
  options = APPEARANCE_OPTIONS,
}: {
  options?: AppearanceOption[];
}) => {
  const dropdownOptions = APPEARANCE_OPTIONS.map((theme) => ({
    ...theme,
    value: theme.label,
  }));

  const optionsState = useOptionsState();
  const setOptionsState = useSetOptionsState();

  const handleChange = (label: string) => {
    const appearanceOption = APPEARANCE_OPTIONS.find((d) => d.label === label);
    setOptionsState({
      ...optionsState,
      appearanceOption,
    });
  };

  const { backgroundColor } = dropdownOptions.find(
    (t) => t.value === optionsState.appearanceOption.label
  );

  useLayoutEffect(() => {
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [backgroundColor]);

  return (
    <Field label="Theme">
      <Select
        value={optionsState.appearanceOption.label}
        onChange={handleChange}
        options={dropdownOptions}
      />
    </Field>
  );
};

export const useAppearanceOption = (): Appearance => {
  const {
    appearanceOption: { appearance },
  } = useOptionsState();

  return appearance;
};
