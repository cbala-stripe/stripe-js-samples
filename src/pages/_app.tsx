import "./_app.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const stripeJsUrl =
    process.env.NEXT_PUBLIC_STRIPE_JS_URL || "https://js.stripe.com/v3";

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={stripeJsUrl}></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
