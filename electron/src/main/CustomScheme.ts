import { protocol } from 'electron'
import fs from 'fs'
import path from 'path'

/** 为自定义的app协议提供特权 */
const schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true,
}

/** 给electron-app这个协议增加特权 */
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'electron-app',
    privileges: schemeConfig,
  },
])

export default class CustomScheme {
  /** 注册自定义app协议 */
  static registerScheme() {
    protocol.registerStreamProtocol('electron-app', (request, callback) => {
      let pathName = new URL(request.url).pathname
      let extension = path.extname(pathName).toLowerCase()
      if (extension == '') {
        pathName = 'index.html'
        extension = '.html'
      }
      const tarFile = path.join(__dirname, pathName)
      callback({
        statusCode: 200,
        headers: { 'content-type': this.getMimeType(extension) },
        data: fs.createReadStream(tarFile),
      })
    })
  }

  /** 根据文件扩展名获取mime-type */
  private static getMimeType(extension: string) {
    let mimeType = ''
    if (extension === '.js') {
      mimeType = 'text/javascript'
    } else if (extension === '.html') {
      mimeType = 'text/html'
    } else if (extension === '.css') {
      mimeType = 'text/css'
    } else if (extension === '.svg') {
      mimeType = 'image/svg+xml'
    } else if (extension === '.json') {
      mimeType = 'application/json'
    }
    return mimeType
  }
}
