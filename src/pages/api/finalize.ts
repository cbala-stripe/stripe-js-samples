import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { getCredentials } from "../../helpers/getCredentials";

const finalizeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secretKey, stripeAccount, apiVersion } = getCredentials("default");

  // @ts-expect-error
  const stripe = new Stripe(secretKey, { apiVersion });
  const requestOptions = stripeAccount ? { stripeAccount } : undefined;

  try {
    const { paymentMethodId, paymentIntentId } = req.body;

    if (!paymentIntentId && !paymentMethodId) {
      const message = "No paymentMethodId or paymentMethodId provided";
      res.status(400).json({ message });
      return;
    }

    let paymentIntent: Stripe.PaymentIntent;

    if (paymentMethodId) {
      paymentIntent = await stripe.paymentIntents.create(
        {
          payment_method: req.body.paymentMethodId,
          amount: 1098,
          currency: "usd",
          confirmation_method: "manual",
          confirm: true,
        },
        requestOptions
      );
    }

    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntentId,
        requestOptions
      );
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
      nextActionType: paymentIntent.next_action?.type,
    });
  } catch (error) {
    res.status(500).json({
      type: error.type,
      code: error.code,
      message: error.message,
    });
  }
};

export default finalizeHandler;
