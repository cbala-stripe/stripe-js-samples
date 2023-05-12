import Script from "next/script";

import { useAppState } from "./AppState";

export const WithStripeJs = ({ children }: { children: React.ReactNode }) => {
  const { stripeJsUrl } = useAppState(["stripeJsUrl"]);

  return (
    <>
      <Script src={stripeJsUrl} />
      {children}
    </>
  );
};
