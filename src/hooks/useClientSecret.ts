import { useState, useEffect } from "react";
import isEqual from "lodash/isEqual";

import type { IntentRequest } from "../pages/api/intent";

export const useClientSecret = (request: IntentRequest): null | string => {
  const [state, setState] = useState({
    clientSecret: null,
    request: null,
  });

  useEffect(() => {
    if (isEqual(request, state.request)) {
      return;
    }

    let isLatestEffect = true;

    fetch("/api/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((r) => r.json())
      .then(({ clientSecret }) => {
        if (!isLatestEffect) {
          return;
        }

        setState({ request, clientSecret });
      });

    return () => {
      isLatestEffect = false;
    };
  }, [request, state.request]);

  if (isEqual(request, state.request)) {
    return state.clientSecret;
  }

  return null;
};
