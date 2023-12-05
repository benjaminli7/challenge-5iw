const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      '@': path.resolve(__dirname, 'src/'),
    },
    configure: (webpackConfig) => {
      if (webpackConfig.cache) {
        webpackConfig.cache = {
          type: 'filesystem',
          buildDependencies: {
            config: [__filename]
          }
        };
      }

      webpackConfig.watchOptions = {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
      };

      return webpackConfig;
    },
  },
};