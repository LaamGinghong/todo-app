import { BannerPlugin, Configuration } from 'webpack'
import { resolve } from 'path'
import { merge } from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import SizePlugin from 'size-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import commonConfiguration from './webpack.common'
import { PROJECT_NAME, PROJECT_ROOT } from '../constants/env'

const prodConfiguration: Configuration = {
  mode: 'production',
  plugins: [
    new BannerPlugin({
      raw: true,
      banner: `/** @preserve Powered by ${PROJECT_NAME} (https://github.com/LaamGinghong/todo_app */`,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 8192,
        configFile: resolve(PROJECT_ROOT, 'tsconfig.json'),
      },
    }),
    new SizePlugin({ writeFile: false }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
}

export default merge(commonConfiguration, prodConfiguration)
