import knex, { Knex } from 'knex'
import fs from 'fs'
import path from 'path'

let dbInstance: Knex

/**
 * 获取db连接实例
 * - Q: 为什么要将db放置到用户目录下?
 * - A: 应用升级会清除掉安装目录，所以要换个地方
 */
const getConnectionInstance = () => {
  if (dbInstance) {
    return dbInstance
  }

  let dbPath = null
  const isLocalServer = location.href.startsWith('http')

  /** 开发环境使用项目中的db 方便调试 */
  if (isLocalServer) {
    dbPath = path.join(process.cwd(), 'src/common/db.db')
  }

  if (!isLocalServer) {
    const winOSPath = process.env.APPDATA
    const iOSPath = `${process.env.HOME}/Library/Preferences`
    const linuxPath = `${process.env.HOME}/.local/share`
    const isIOS = process.platform == 'darwin'

    const userPath = winOSPath || (isIOS ? iOSPath : linuxPath)
    const userElectronDBPath = path.join(userPath, 'electron/db.db')

    const isDbExist = fs.existsSync(userElectronDBPath)

    /** 没有db则去安装目录复制db */
    if (!isDbExist) {
      /** process.execPath 是用户安装app的目录 resources/db.db在electron-builder打包时配置在 config.config.extraResources中 */
      const resourceDbPath = path.join(process.execPath, '../resources/db.db')

      fs.copyFileSync(resourceDbPath, userElectronDBPath)
    }

    dbPath = userElectronDBPath
  }

  dbInstance = knex({
    client: 'better-sqlite3',
    connection: { filename: dbPath },
    useNullAsDefault: true,
  })

  return dbInstance
}

export default getConnectionInstance()
