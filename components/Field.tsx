import { LABEL_CLASSNAME } from "../constants";

export const Field: React.FC<{ label: string }> = ({ label, children }) => {
  return (
    <label>
      <div className={LABEL_CLASSNAME}>{label}</div>
      {children}
    </label>
  );
};
