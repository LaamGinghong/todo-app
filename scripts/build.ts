import webpack, { Stats } from 'webpack'

import prodConfiguration from '../config/webpack.prod'

webpack(prodConfiguration).run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  const options: Stats.ToStringOptions = {
    colors: true,
    modules: false,
  }

  console.log(stats.toString(options))
})
