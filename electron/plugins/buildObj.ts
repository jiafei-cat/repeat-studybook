import path from 'path'
import fs from 'fs'

export default class BuildObj {
  /** 打包electron main js文件 */
  buildMain() {
    require('esbuild').buildSync({
      entryPoints: ['./src/main/mainEntry.ts'],
      bundle: true,
      platform: 'node',
      minify: true,
      outfile: './dist/mainEntry.js',
      external: ['electron'],
    })
  }

  /** 处理package.json 方便给electron-builder用 */
  preparePackageJson() {
    /** package.json目录 */
    const pkgJsonPath = path.join(process.cwd(), 'package.json')

    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    /** 固定版本 */
    const electronConfig = localPkgJson.devDependencies.electron.replace('^', '')
    localPkgJson.devDependencies = { electron: electronConfig }
    /** 指定入口 */
    localPkgJson.main = 'mainEntry.js'

    /** 删除无用项 */
    delete localPkgJson.scripts
    delete localPkgJson.devDependencies

    /** 重新写入到 /dist 目录 */
    const tarJsonPath = path.join(process.cwd(), 'dist', 'package.json')
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson))
    fs.mkdirSync(path.join(process.cwd(), 'dist/node_modules'))
  }

  /** 使用electron-builder制成安装包 */
  buildInstaller() {
    let options = {
      config: {
        directories: {
          /** 指定构建输出的目标目录 */
          output: path.join(process.cwd(), 'release'),
          /** 指定应用程序源代码的目录 */
          app: path.join(process.cwd(), 'dist'),
        },
        /**
         * 指定要包含的文件或目录的路径。
         * 可以是单个文件或目录，也可以是通配符模式。
         * 相对路径会相对于配置文件所在的位置解析
         */
        files: ['**'],
        extends: null,
        productName: 'electron',
        appId: 'com.electron.desktop',
        /**
         * 是否启用asar打包
         * 启用: 应用程序的源代码和资源文件将被打包成 ASAR 格式，作为单个归档文件存储
         * ASAR 打包可以减少应用程序的文件数量和大小，提高加载性能，并保护源代码免受用户的直接访问和修改。
         * 使用 ASAR 打包后，将无法直接编辑和查看打包的文件，它们被封装在单个归档文件中
         */
        asar: true,
        /**
         * Nullsoft Scriptable Install System
         */
        nsis: {
          /** 是否启用一键安装模式 */
          oneClick: true,
          /** 是否全局安装，全局安装需要管理员权限 */
          perMachine: true,
          /** 是否允许用户更改安装目录 */
          allowToChangeInstallationDirectory: false,
          /** 是否创建桌面快捷图标 */
          createDesktopShortcut: true,
          /** 是否创建开始菜单快捷图标 */
          createStartMenuShortcut: true,
          /** 快捷图标名称 */
          shortcutName: 'electronDesktop',
        },
        publish: [
          {
            /** 发布选项: generic - 通用 */
            provider: 'generic',
            url: 'http://localhost:5500/',
          },
        ],
      },
      project: process.cwd(),
    }
    return require('electron-builder').build(options)
  }
}
