const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: false,
        },
      }),
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,

          },
          {
            loader: 'css-loader',
            options: {
              url: false, 
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('cssnano')({
                  preset: 'default',
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  entry: ["@babel/polyfill", "./src/main.js", "./raw.scss"],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jqCookie': 'jquery.cookie',
      jQuery: 'jquery',
      toastr: 'toastr'
    }),
    new MiniCssExtractPlugin({
      filename: 'compiled.min.css',
    }),
  ],
  output: {
    library: "rcsj",
    filename: "main-rcsj.js",
    path: path.resolve(__dirname, "dist")
  }
};