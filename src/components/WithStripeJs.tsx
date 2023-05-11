import Script from "next/script";

import { useOptionsState } from "./OptionsState";

export const WithStripeJs = ({ children }: { children: React.ReactNode }) => {
  const { stripeJsUrl } = useOptionsState();

  return (
    <>
      <Script src={stripeJsUrl} />
      {children}
    </>
  );
};
