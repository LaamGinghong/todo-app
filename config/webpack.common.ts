import { Configuration } from 'webpack'
import { resolve } from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

import { IS_DEV, PROJECT_NAME, PROJECT_ROOT } from '../constants/env'
import htmlMinifierOptions from '../constants/html-minify-options'
import getCssLoaders from '../constants/get-css-loader'

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
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          experimentalFileCaching: true,
          configFile: resolve(PROJECT_ROOT, 'tsconfig.json'),
        },
      },
      { test: /\.css$/, use: getCssLoaders(0) },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(1),
          { loader: 'less-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
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
