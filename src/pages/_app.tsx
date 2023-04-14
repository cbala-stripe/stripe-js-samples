import Head from "next/head";

import { OptionsState } from "../components/OptionsState";
import "./_app.css";

const App = ({ Component, pageProps }) => {
  const stripeJsUrl = process.env.NEXT_PUBLIC_STRIPE_JS_URL;

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {stripeJsUrl && <script src={stripeJsUrl}></script>}
      </Head>
      <OptionsState>
        <Component {...pageProps} />
      </OptionsState>
    </>
  );
};

export default App;
