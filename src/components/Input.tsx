import { INPUT_CLASSNAME } from "../constants";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const className = `${INPUT_CLASSNAME} ${props.className ?? ""}`;

  return <input type="text" {...props} className={className} />;
};
