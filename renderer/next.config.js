require('dotenv').config();
const withCSS = require('@zeit/next-css');
const withTypeScript = require('@zeit/next-typescript');
const path = require('path');
const webpack = require('webpack');

module.exports = withTypeScript(
  withCSS({
    webpack(config){
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      config.resolve.alias['@app'] = path.resolve('./');
      config.target = 'electron-renderer';
      return config;
    } 
}));
