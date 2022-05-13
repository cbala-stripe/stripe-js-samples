import { ReactNode } from "react";
import { LABEL_CLASSNAME } from "../constants";

export const Field = ({
  label,
  children,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <label>
      <div className={LABEL_CLASSNAME}>{label}</div>
      {children}
    </label>
  );
};
