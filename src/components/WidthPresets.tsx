import { useAppState, useSetAppState } from "./AppState";
import { Field } from "./Field";
import { Select } from "./Select";

const OPTIONS = [
  { value: "full", label: "Dynamic" },
  { value: "320", label: "320 px (iPhone 4)" },
  { value: "375", label: "375 px (iPhone SE)" },
  { value: "768", label: "768 px (iPad Mini)" },
  { value: "1440", label: "1440 px (Laptop)" },
  { value: "2880", label: "2880 px (Humungous)" },
];

export const WidthsPresets = () => {
  const { sampleWidth } = useAppState(["sampleWidth"]);
  const setAppState = useSetAppState();

  const value = OPTIONS.find((d) => +d.value === sampleWidth)?.value ?? "full";

  const handleChange = (option: string) => {
    const sampleWidth = option === "full" ? option : +option;
    setAppState("sampleWidth", sampleWidth);
  };

  return (
    <Field label="Width">
      <Select value={value} onChange={handleChange} options={OPTIONS} />
    </Field>
  );
};
