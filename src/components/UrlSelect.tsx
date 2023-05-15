import { Field } from "./Field";
import { Select } from "./Select";

import { useAppState, useSetAppState } from "./AppState";

const OPTIONS = [
  { value: "prod", label: "js.stripe.com" },
  { value: "edge", label: "edge-js.stripe.com" },
  { value: "localhost", label: "localhost" },
];

export const UrlSelect = () => {
  const { stripeJsUrl } = useAppState(["stripeJsUrl"]);
  const setAppState = useSetAppState();

  let options = OPTIONS;
  if (!OPTIONS.find((option) => option.value === stripeJsUrl)) {
    options = [...OPTIONS, { value: stripeJsUrl, label: stripeJsUrl }];
  }

  const handleChange = (value: string) => {
    setAppState("stripeJsUrl", value);

    setTimeout(() => {
      location.reload();
    }, 200);
  };

  return (
    <Field label="URL">
      <Select value={stripeJsUrl} onChange={handleChange} options={options} />
    </Field>
  );
};
