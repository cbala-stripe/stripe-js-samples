import { FC, ReactNode } from "react";

const ListItem = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>;
};

export const List: FC<{ className?: string; children: ReactNode }> & {
  Item: typeof ListItem;
} = ({ children, className = "" }) => {
  return (
    <ul className={`text-sm list-disc list-inside ${className}`}>{children}</ul>
  );
};

List.Item = ListItem;
