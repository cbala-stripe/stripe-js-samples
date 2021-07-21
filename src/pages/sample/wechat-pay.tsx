import { ElementSample, CredentialedElements, Layout } from "../../components";
import { getPaymentIntentClientSecret } from "../../helpers/getPaymentIntentClientSecret";

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
  const clientSecret = await getPaymentIntentClientSecret({
    currency: "usd",
    amount: 1099,
    payment_method_types: ["wechat_pay"],
  });

  return { props: { clientSecret } };
};
