import { useRouter } from "next/router";

import { PAGES } from "../constants";
import { Field } from "./Field";
import { Select } from "./Select";

const OPTIONS = [
  { value: "none", label: "-- Select a sample --", disabled: true },
  ...PAGES.map(({ title, href }) => ({
    value: href,
    label: title,
  })),
];

export const SampleSelect = ({ label = "Sample" }: { label?: string }) => {
  const router = useRouter();

  const handleChange = (pathname: string) => {
    const query = window.location.search;
    router.push(`${pathname}${query}`);
  };

  const value =
    PAGES.find(({ href }) => href === router.pathname)?.href ?? "none";

  return (
    <Field label={label}>
      <Select value={value} onChange={handleChange} options={OPTIONS} />
    </Field>
  );
};
