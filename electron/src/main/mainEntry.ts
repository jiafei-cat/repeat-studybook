import { app, BrowserWindow } from 'electron'

/** 设置为全局变量: 避免主窗口被 JavaScript 的垃圾回收器回收掉 */
let mainWindow: BrowserWindow

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      /** 允许渲染进程使用node */
      nodeIntegration: true,
      /** 是否启用同源策略  */
      webSecurity: false,
      /** 是否允许渲染进程加载不安全内容  */
      allowRunningInsecureContent: true,
      /**
       * 上下文是否隔离 (主进程的上下文和渲染进程的上下文是否隔离)
       * 不隔离的话渲染进程可以直接使用主进程提供的系统API和node.js
       */
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  }
  mainWindow = new BrowserWindow(config)
  /** 打开浏览器的开发工具 */
  mainWindow.webContents.openDevTools({ mode: 'right' })
  mainWindow.loadURL(process.argv[2])
})
