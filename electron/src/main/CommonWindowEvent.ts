import { BrowserWindow, ipcMain, app } from 'electron'
import { browserConfig } from './config'
import type { BrowserWindowConstructorOptions } from 'electron'
import merge from 'merge'

/** 公共的窗口事件 */
export class CommonWindowEvent {
  /** 获取当前窗口 */
  private static getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender)
  }
  /** 注册ipc事件 */
  public static listen() {
    /** 注册缩小窗口事件 */
    ipcMain.handle('minimizeWindow', (e) => {
      this.getWin(e)?.minimize()
    })

    /** 注册最大化窗口事件 */
    ipcMain.handle('maxmizeWindow', (e) => {
      this.getWin(e)?.maximize()
    })

    /** 注册还原窗口事件 */
    ipcMain.handle('unmaximizeWindow', (e) => {
      this.getWin(e)?.unmaximize()
    })

    /** 注册隐藏窗口事件 */
    ipcMain.handle('hideWindow', (e) => {
      this.getWin(e)?.hide()
    })

    /** 注册显示窗口事件 */
    ipcMain.handle('showWindow', (e) => {
      this.getWin(e)?.show()
    })

    /** 注册关闭窗口事件 */
    ipcMain.handle('closeWindow', (e) => {
      this.getWin(e)?.close()
    })

    /** 注册调整窗口大小事件 */
    ipcMain.handle('resizable', (e) => {
      return this.getWin(e)?.isResizable()
    })

    ipcMain.handle('getPath', (e, name: any) => {
      return app.getPath(name)
    })
  }

  /**
   * 公共事件处理逻辑 (包括所有窗口)
   */
  public static regWinEvent(win: BrowserWindow) {
    /** 窗口最大化后ipc通知窗口 */
    win.on('maximize', () => {
      win.webContents.send('windowMaximized')
    })

    /** 窗口不是最大化后ipc通知窗口 */
    win.on('unmaximize', () => {
      win.webContents.send('windowUnmaximized')
    })

    win.webContents.openDevTools({ mode: 'right' })

    /** 设置子窗口的config (对第一个窗口无效) */
    win.webContents.setWindowOpenHandler((param) => {
      /** 通过 window.open 传入的参数 */
      const features = JSON.parse(param.features) as BrowserWindowConstructorOptions

      const mergeConfig = merge.recursive(browserConfig, features)

      /**
       * 配置项model,
       * 代表子窗口是一个模拟窗口(父窗口不可操作，只有关闭了子窗口父窗口才可以操作)，
       * 为其指定父窗口 */
      if (mergeConfig.modal) {
        mergeConfig.parent = win
      }

      /**
       * action: 是否允许打开窗口
       * - allow: 允许
       * - deny: 不允许
       */
      return { action: 'allow', overrideBrowserWindowOptions: mergeConfig }
    })
  }
}
