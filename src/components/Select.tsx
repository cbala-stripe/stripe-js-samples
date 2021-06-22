import { INPUT_CLASSNAME } from "../constants";

export const Select: React.FC<{
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}> = ({ className = "", value = "", onChange, options, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`${INPUT_CLASSNAME} appearance-none ${className}`}
      {...props}
    >
      {options.map(({ value, label, disabled }) => (
        <option key={value} value={value} disabled={disabled}>
          {label}
        </option>
      ))}
    </select>
  );
};
