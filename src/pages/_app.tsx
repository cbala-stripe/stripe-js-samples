import { OptionsState } from "../components/OptionsState";
import { WithStripeJs } from "../components/WithStripeJs";
import "./_app.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <OptionsState>
        <WithStripeJs>
          <Component {...pageProps} />
        </WithStripeJs>
      </OptionsState>
    </>
  );
};

export default App;
