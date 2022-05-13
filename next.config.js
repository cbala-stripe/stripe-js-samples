module.exports = {
  reactStrictMode: true,
  target: "serverless",
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
