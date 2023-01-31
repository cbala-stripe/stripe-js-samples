const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    reactStrictMode: true,

    async headers() {
      const csp = {
        "base-uri": [`'none'`],
        "object-src": [`'none'`],
        "frame-src": ["https://js.stripe.com", "https://hooks.stripe.com"],
        "script-src": [
          `'self'`,
          "https://js.stripe.com",
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
