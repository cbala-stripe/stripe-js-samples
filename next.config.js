module.exports = {
  env: {
    STRIPE_TEST_PK: process.env.STRIPE_TEST_PK,
    STRIPE_TEST_SK: process.env.STRIPE_TEST_SK,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sample/split-card",
        permanent: false,
      },
    ];
  },
};
