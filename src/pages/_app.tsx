import { AppState } from "../components/AppState";
import { WithStripeJs } from "../components/WithStripeJs";
import "./_app.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <AppState>
        <WithStripeJs>
          <Component {...pageProps} />
        </WithStripeJs>
      </AppState>
    </>
  );
};

export default App;
