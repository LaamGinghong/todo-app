declare module 'size-plugin' {
  import { Plugin } from 'webpack'

  interface SizePluginOptions {
    writeFile: boolean
  }

  class SizePlugin extends Plugin {
    constructor(options?: Partial<SizePluginOptions>)
  }

  export = SizePlugin
}
