import React, { useState, ReactNode } from "react";
import { useAppState } from "./AppState";
import { SampleSelect } from "./SampleSelect";
import { UrlSelect } from "./UrlSelect";
import { WidthsPresets } from "./WidthPresets";

const MD_BREAKPOINT = 768;

const LeftArrows = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 7l-5 5l5 5" />
      <path d="M17 7l-5 5l5 5" />
    </svg>
  );
};

const RightArrows = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 7l5 5l-5 5" />
      <path d="M13 7l5 5l-5 5" />
    </svg>
  );
};

const SidebarToggle = ({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => any;
}) => {
  return (
    <button
      type="submit"
      className={`w-12 h-16 text-zinc-600 min-w-full flex ${
        collapsed && "flex-grow"
      } shrink-0 justify-center items-center bg-zinc-100 hover:bg-zinc-200`}
      onClick={toggleCollapsed}
    >
      {collapsed ? (
        <>
          <span className="sr-only text-xs pr-1 uppercase font-medium">
            Show options
          </span>
          <RightArrows />
        </>
      ) : (
        <>
          <LeftArrows />
          <span className="text-xs pl-1 uppercase font-medium">
            Hide options
          </span>
        </>
      )}
    </button>
  );
};

const Sidebar = ({ controls }: { controls: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < MD_BREAKPOINT);

  return (
    <div
      className={`bg-zinc-50 fixed top-0 left-0 bottom-0 md:relative flex-col flex max-w-full h-full z-10 ${
        !collapsed ? "drop-shadow" : ""
      }  md:drop-shadow-none`}
    >
      {!collapsed && (
        <div className="flex-grow overflow-auto flex flex-col gap-y-4 p-4 w-80">
          <UrlSelect />
          <SampleSelect />
          <WidthsPresets />
          {controls}
        </div>
      )}
      <SidebarToggle
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
    </div>
  );
};

export const Layout = ({
  children,
  controls = null,
}: {
  children?: ReactNode;
  controls?: ReactNode;
}) => {
  const { sampleWidth } = useAppState(["sampleWidth"]);

  return (
    <div className="flex w-full h-full">
      <Sidebar controls={controls} />
      <div className="p-8 h-full overflow-y-auto flex-grow pl-20 md:pl-8">
        <div
          style={{ width: sampleWidth !== "full" ? `${sampleWidth}px` : null }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
