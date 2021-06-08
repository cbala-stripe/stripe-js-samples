import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import { PAGES, INPUT_CLASSNAME } from "../constants";
import { Field } from "./Field";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const handleChange = (e) => {
    router.push(e.target.value);
  };

  const value =
    PAGES.find(({ href }) => href === router.pathname)?.href ?? "none";

  return (
    <div>
      <div className="bg-gray-100 pt-6 pb-8 px-8 border-b border-gray-200">
        <Field label="Sample">
          <select
            value={value}
            onChange={handleChange}
            className={`${INPUT_CLASSNAME} appearance-none`}
          >
            <option value={"none"} disabled>
              -- Select a sample --
            </option>
            {PAGES.map(({ title, href }) => (
              <option value={href} key={href}>
                {title}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
};
