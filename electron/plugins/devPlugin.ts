import { ViteDevServer } from 'vite'
import { AddressInfo } from 'net'

export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    /** configureServer钩子: 当 Vite 启动 Http 服务的时候，configureServer钩子会被执行 */
    configureServer: (server: ViteDevServer) => {
      /** 通过esbuild 转译 mainEntry.ts */
      require('esbuild').buildSync({
        entryPoints: ['./src/main/mainEntry.ts'],
        bundle: true,
        platform: 'node',
        outfile: './dist/mainEntry.js',
        external: ['electron'],
      })

      /** 监听vite 的httpServer来确保server已经启动 */
      server.httpServer?.once('listening', () => {
        const { spawn } = require('child_process')

        /** 获取当前vite启动的服务地址 */
        const addressInfo = server.httpServer?.address() as AddressInfo
        console.log(addressInfo)
        const httpAddress = `http://localhost:${addressInfo.port}`

        /** 通过vite子进程启动 electron (指定编译好的mainEntry.js和要加载的vite服务地址) */
        const electronProcess = spawn(require('electron').toString(), ['./dist/mainEntry.js', httpAddress], {
          cwd: process.cwd(),
          /** 继承主进程的输入输出 */
          stdio: 'inherit',
        })

        /** vite server关闭时也关闭electron进程 */
        server.httpServer.once('close', () => {
          electronProcess.kill()
        })

        /** electron进程关闭时, vite服务和vite进程同时也关闭 */
        electronProcess.on('close', () => {
          server.close()
          process.exit()
        })
      })
    },
  }
}
