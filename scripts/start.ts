import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { resolve } from 'path'

import devConfiguration from '../config/webpack.dev'
import { PROJECT_ROOT } from '../constants/env'

const server = new WebpackDevServer(webpack(devConfiguration), {
  contentBase: resolve(PROJECT_ROOT, 'dist'),
  hot: true,
  open: 'Microsoft Edge',
  host: 'localhost',
  port: 8080,
  historyApiFallback: {
    disableDotRule: true,
  },
  inline: true,
  stats: 'errors-only',
})

server.listen(8080)
