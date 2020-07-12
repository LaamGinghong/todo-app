import { BannerPlugin, Configuration } from 'webpack'
import { resolve } from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

import { IS_DEV, PROJECT_NAME, PROJECT_ROOT } from '../constants/env'
import htmlMinifierOptions from '../constants/html-minify-options'

const commonConfiguration: Configuration = {
  entry: resolve(PROJECT_ROOT, 'src', 'index.ts'),
  context: resolve(PROJECT_ROOT),
  output: {
    path: resolve(PROJECT_ROOT, 'dist'),
    filename: '[name].[hash].bundle.js',
    hashSalt: PROJECT_NAME,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [
    new WebpackBar(),
    new BannerPlugin({
      raw: true,
      banner: `/** @preserve Powered by ${PROJECT_NAME} (https://github.com/LaamGinghong/todo_app`,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: IS_DEV ? false : htmlMinifierOptions,
      title: PROJECT_NAME,
      template: resolve(PROJECT_ROOT, 'index.html'),
    }),
    new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } }),
  ],
}

export default commonConfiguration
