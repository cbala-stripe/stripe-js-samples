import { useRouter } from "next/router";

import { PAGES } from "../constants";
import { Field } from "./Field";
import { Select } from "./Select";

export const SampleSelect = ({
  label = "Sample",
  options: optionsProp,
}: {
  label?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}) => {
  const router = useRouter();

  const handleChange = (value: string) => {
    router.push(value);
  };

  const value =
    PAGES.find(({ href }) => href === router.pathname)?.href ?? "none";

  const options = [
    { value: "none", label: "-- Select a sample --", disabled: true },
    ...optionsProp,
  ];

  return (
    <Field label={label}>
      <Select value={value} onChange={handleChange} options={options} />
    </Field>
  );
};
