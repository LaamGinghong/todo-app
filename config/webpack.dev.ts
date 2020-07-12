import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import { resolve } from 'path'
import { merge } from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import { PROJECT_ROOT } from '../constants/env'
import commonConfiguration from './webpack.common'

const devConfiguration: Configuration = {
  mode: 'development',
  module: {
    rules: [{ test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' }],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
        configFile: resolve(PROJECT_ROOT, 'tsconfig.json'),
      },
    }),
    new HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
}

export default merge(commonConfiguration, devConfiguration)
