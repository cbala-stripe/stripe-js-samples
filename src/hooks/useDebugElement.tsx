import * as React from "react";
import { useState } from "react";

export const useDebugElement = (): [JSX.Element, (response?: any) => void] => {
  const [response, setResponse] = useState(null);

  if (!response) {
    return [null, setResponse];
  }

  const debugElement = (
    <pre className="text-sm w-full overflow-scroll">
      <code>
        {typeof response === "string"
          ? response
          : JSON.stringify(response, null, "  ")}
      </code>
    </pre>
  );

  return [debugElement, setResponse];
};
