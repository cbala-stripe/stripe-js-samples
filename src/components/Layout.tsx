import { useRouter } from "next/router";

import { PAGES } from "../constants";
import { Field } from "./Field";
import { Select } from "./Select";

export const Layout: React.FC<{ controls?: JSX.Element }> = ({
  children,
  controls = null,
}) => {
  const router = useRouter();

  const handleChange = (value) => {
    router.push(value);
  };

  const value =
    PAGES.find(({ href }) => href === router.pathname)?.href ?? "none";

  const options = [
    { value: "none", label: "-- Select a sample --", disabled: true },
    ...PAGES.map(({ title, href }) => ({
      value: href,
      label: title,
    })),
  ];

  return (
    <>
      <header className="bg-gray-100 pt-6 pb-8 px-8 border-b border-gray-200 grid gap-4">
        <Field label="Sample">
          <Select value={value} onChange={handleChange} options={options} />
        </Field>
        {controls}
      </header>
      <div className="p-8">{children}</div>
    </>
  );
};
