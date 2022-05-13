import "./_app.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const stripeJsUrl = process.env.NEXT_PUBLIC_STRIPE_JS_URL;

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {stripeJsUrl && <script src={stripeJsUrl}></script>}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
