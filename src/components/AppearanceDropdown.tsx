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
    setOptionsState({
      ...optionsState,
      appearance: label,
    });
  };

  const { backgroundColor } = dropdownOptions.find(
    (t) => t.value === optionsState.appearance
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
        value={optionsState.appearance}
        onChange={handleChange}
        options={dropdownOptions}
      />
    </Field>
  );
};

export const useAppearanceOption = (): AppearanceOption => {
  const { appearance: appearanceLabel } = useOptionsState();

  return APPEARANCE_OPTIONS.find((d) => d.label === appearanceLabel);
};
