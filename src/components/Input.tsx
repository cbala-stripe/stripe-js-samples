import { INPUT_CLASSNAME } from "../constants";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const className = `${INPUT_CLASSNAME} ${props.className ?? ""}`;

  return <input type="text" {...props} className={className} />;
};
