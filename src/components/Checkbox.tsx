export const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (newVaulue: boolean) => void;
}) => {
  return (
    <input
      type="checkbox"
      className="mt-2"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};
