const { alias, configPaths } = require("react-app-rewire-alias");
const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    fs: false,
  });
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/]; //warning message 제거
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return alias(configPaths("./tsconfig.paths.json"))(config);
};
