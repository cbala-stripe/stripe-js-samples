import { ReactNode } from "react";
import { PAGES } from "../constants";
import { SampleSelect } from "./SampleSelect";

export const Layout = ({
  children,
  controls = null,
}: {
  children?: ReactNode;
  controls?: JSX.Element;
}) => {
  const options = PAGES.map(({ title, href }) => ({
    value: href,
    label: title,
  }));

  return (
    <>
      <header className="bg-gray-100 py-6 px-8 border-b border-gray-200 grid gap-4">
        <SampleSelect options={options} />
        {controls}
      </header>
      <div className="p-8">{children}</div>
    </>
  );
};
