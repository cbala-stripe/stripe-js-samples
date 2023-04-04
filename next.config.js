const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    reactStrictMode: true,

    async headers() {
      const stripeJsUrl = process.env.NEXT_PUBLIC_STRIPE_JS_URL ?? 'https://js.stripe.com/v3/'
      const stripeJsOrigin = new URL(stripeJsUrl).origin;

      const csp = {
        "base-uri": [`'none'`],
        "object-src": [`'none'`],
        "frame-src": [
          stripeJsOrigin,
          "https://hooks.stripe.com",
        ],
        "script-src": [
          `'self'`,
          stripeJsOrigin,
          "https://maps.googleapis.com",
        ],
        "connect-src": [
          `'self'`,
          "https://api.stripe.com",
          "https://maps.googleapis.com",
        ],
      };

      if (phase === PHASE_DEVELOPMENT_SERVER) {
        csp["script-src"].push(`'unsafe-eval'`);
      }

      const cspHeaderValue = Object.entries(csp).reduce(
        (acc, [directive, values]) =>
          `${acc}; ${directive} ${values.join(" ")}`,
        ""
      );

      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: cspHeaderValue,
            },
          ],
        },
      ];
    },
  };

  return config;
};
