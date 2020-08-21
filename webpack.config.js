require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: process.env.MODE,
  entry: path.join(__dirname, 'client/index.jsx'),
  watch: false,
  output: {
    path: path.join(__dirname, './dist/client'),
    publicPath: '/dist/',
    filename: 'main.js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, './client'),
        path.resolve(__dirname, './client/components'),
      ],
      exclude: [
        path.resolve(__dirname, './server'),
      ],
      loader: 'babel-loader',
      query: {
        presets: [
          ['@babel/env', {
            targets: {
              browsers: 'last 2 chrome versions',
            },
          }],
          '@babel/preset-react',
        ],
      },
    },
    {
      test: /\.s(c|a)ss$/,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
      include: [
        path.resolve(__dirname, 'client'),
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'server'),
      ],
    },
    {
      test: /\.(eot|woff|woff2|svg|ttf|css)([\?]?.*)$/,
      use: ['file-loader'],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './client/index.html' }),
    new CopyWebpackPlugin({ patterns: [{ from: './client/public', to: 'public' }] }),
    new webpack.ExternalsPlugin('commonjs', ['electron']),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist/client'),
    inline: true,
    host: 'localhost',
    port: 8080,
  },
};
