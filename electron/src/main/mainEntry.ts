import { app, BrowserWindow } from 'electron'
import CustomScheme from './CustomScheme'
import { CommonWindowEvent } from './CommonWindowEvent'
import { browserConfig } from './config'
/** 因为关闭了安全策略，会报安全警告，这里先关闭 */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
/** 设置为全局变量: 避免主窗口被 JavaScript 的垃圾回收器回收掉 */
let mainWindow: BrowserWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow(browserConfig)

  CommonWindowEvent.listen()

  if (process.argv[2]) {
    /** 打开浏览器的开发工具 */
    mainWindow.webContents.openDevTools({ mode: 'right' })
    mainWindow.loadURL(process.argv[2])
  } else {
    /**
     * 打包后的electron加载的mainEntry文件没有process.argv[2]传入
     * 所以通过electron申请一个协议用于加载内部的html
     */
    CustomScheme.registerScheme()
    mainWindow.loadURL(`electron-app://index.html`)
  }
})

/** 创建窗口时(包括创建子窗口)也注册窗口事件 (new BrowserWindow也会执行该监听) */
app.on('browser-window-created', (e, win) => {
  CommonWindowEvent.regWinEvent(win)
})
