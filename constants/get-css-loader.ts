import { RuleSetUseItem } from 'webpack'
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin'
import { IS_DEV } from './env'

function getCssLoaders(importLoaders: number): RuleSetUseItem[] {
  return [
    IS_DEV ? 'style-loader' : MiniCssExtractLoader,
    { loader: 'css-loader', options: { modules: false, sourceMap: true, importLoaders } },
  ]
}

export default getCssLoaders
