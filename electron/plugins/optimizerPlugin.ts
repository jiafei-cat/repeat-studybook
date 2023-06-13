import fs from 'fs'

/**
 * 因vite屏蔽了node/electron等内置模块
 * 需要通过中间文件去引入这些模块，通过vite alias去指定模块和中间文件
 * 达到引入内置模块
 */
export default (externalModules = []) => {
  return {
    name: 'vite-optimizer-plugin',
    config: async (config) => {
      /** 中间文件的目录 */
      const pluginDir = `${process.cwd()}/node_modules/.vite-optimizer-plugin`
      /** 中间文件目录无则建 */
      const isExist = fs.existsSync(pluginDir)
      if (!isExist) {
        fs.mkdirSync(pluginDir)
      }

      /**
       * optimizeDeps.exclude的作用
       * 是防止中间文件又被alias指定导致模块的无限循环引用
       */
      if (!config.optimizeDeps) config.optimizeDeps = {}
      if (!config.optimizeDeps.exclude) config.optimizeDeps.exclude = []

      if (!config.resolve) config.resolve = {}
      if (!config.resolve.alias) config.resolve.alias = []

      externalModules.forEach((modules) => {
        const [module, childModules] = modules.split(':')

        let code = `const ${module} = require('${module}');export { ${module} as default }`
        if (childModules) {
          code = `const {${childModules}} = require('${module}');export { ${childModules} }`
        }

        /** 写入中间文件 */
        fs.writeFileSync(`${pluginDir}/${module}.js`, code)

        /** 指定alias */
        config.resolve.alias.push({
          find: new RegExp(`^${module}$`),
          replacement: `${pluginDir}/${module}`,
        })

        /** 排除中间文件模块，防止无限被alias */
        config.optimizeDeps.exclude.push(module)
      })
    },
  }
}
