import { isEqual } from "lodash";
import { useRef } from "react";

export const useStableValue = <T>(value: T) => {
  const ref = useRef(value);

  if (isEqual(value, ref.current)) {
    return ref.current;
  } else {
    ref.current = value;
    return value;
  }
};
