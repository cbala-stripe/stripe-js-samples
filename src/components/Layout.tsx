import { useState } from "react";

import { PAGES } from "../constants";
import { SampleSelect } from "./SampleSelect";

export const Layout: React.FC<{ controls?: JSX.Element }> = ({
  children,
  controls = null,
}) => {
  const [showControls, setShowControls] = useState(true);

  const options = PAGES.map(({ title, href }) => ({
    value: href,
    label: title,
  }));

  return (
    <>
      <header className="bg-gray-100 pt-6 pb-4 px-8 border-b border-gray-200 grid gap-4">
        <div className="flex items-end justify-between">
          <SampleSelect options={options} />
          {controls && (
            <button
              className="p-2 w-16 hover:bg-gray-200 rounded"
              onClick={() => setShowControls(!showControls)}
            >
              {showControls ? "↑" : "↓"}
            </button>
          )}
        </div>
        {showControls && controls}
      </header>
      <div className="p-8">{children}</div>
    </>
  );
};
