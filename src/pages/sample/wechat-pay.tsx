import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getIntentClientSecret } from "../../helpers/getIntentClientSecret";

const WechatPaySample = ({ clientSecret }) => {
  const handleSubmit = async ({ stripe, elements, name, email }) => {
    return stripe.confirmWechatPayPayment(clientSecret, {
      payment_method_options: {
        wechat_pay: {
          client: "web",
        },
      },
    });
  };

  return (
    <Layout>
      <CredentialedElements>
        <ElementSample onSubmit={handleSubmit} />
      </CredentialedElements>
    </Layout>
  );
};

export default WechatPaySample;

export const getServerSideProps = async () => {
  const clientSecret = await getIntentClientSecret("payment", {
    currency: "usd",
    amount: 1099,
    payment_method_types: ["wechat_pay"],
  });

  return { props: { clientSecret } };
};
