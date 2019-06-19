require('dotenv').config();
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');
// eslint-disable-next-line
const webpack = require('webpack');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@app'] = path.resolve('./');
      // eslint-disable-next-line no-param-reassign
      config.target = 'electron-renderer';
      return config;
    },
  }),
);
