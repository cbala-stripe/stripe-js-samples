import {
  ElementSample,
  CredentialedElements,
  Layout,
  SubmitCallback,
} from "../../components";
import { useClientSecret } from "../../hooks";

const WechatPaySample = () => {
  const clientSecret = useClientSecret({
    intentType: "payment",
    credentials: "default",
    intentParameters: {
      currency: "usd",
      payment_method_types: ["wechat_pay"],
    },
  });

  const handleSubmit: SubmitCallback = async ({
    stripe,
    elements,
    name,
    email,
  }) => {
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
