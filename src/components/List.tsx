import { FC } from "react";

type ListItemProps = {};

const ListItem: FC<ListItemProps> = ({ children }) => {
  return <li>{children}</li>;
};

export const List: FC<{ className?: string }> & { Item: typeof ListItem } = ({
  children,
  className = "",
}) => {
  return (
    <ul className={`text-sm list-disc list-inside ${className}`}>{children}</ul>
  );
};

List.Item = ListItem;
