export const Button = ({
  className = "",
  children,
  primary = false,
  ...props
}) => {
  return (
    <button
      className={`${className} ${
        primary
          ? "bg-blue-500 hover:bg-blue-400 text-gray-50"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      } ${
        props.disabled ? "opacity-80 cursor-default" : ""
      } py-2 px-3 rounded text-sm`}
      {...props}
    >
      {children}
    </button>
  );
};
