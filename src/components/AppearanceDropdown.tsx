import { useLayoutEffect } from "react";

import { Field } from "./Field";
import { Select } from "./Select";

import { APPEARANCE_OPTIONS } from "../constants/appearanceOptions";
import type { AppearanceOption } from "../constants/appearanceOptions";
import { useAppState, useSetAppState } from "./AppState";

export const useAppearanceOption = (): AppearanceOption => {
  const { appearance: appearanceLabel } = useAppState(["appearance"]);

  return APPEARANCE_OPTIONS.find((d) => d.label === appearanceLabel);
};

export const AppearanceDropdown = ({
  options = APPEARANCE_OPTIONS,
}: {
  options?: AppearanceOption[];
}) => {
  const dropdownOptions = APPEARANCE_OPTIONS.map((theme) => ({
    ...theme,
    value: theme.label,
  }));

  const { label, backgroundColor } = useAppearanceOption();

  const setAppState = useSetAppState();
  const handleChange = (label: string) => {
    setAppState("appearance", label);
  };

  useLayoutEffect(() => {
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, [backgroundColor]);

  return (
    <Field label="Theme">
      <Select value={label} onChange={handleChange} options={dropdownOptions} />
    </Field>
  );
};
