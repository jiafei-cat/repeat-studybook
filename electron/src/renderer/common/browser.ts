import type { BrowserWindowConstructorOptions } from 'electron'

interface IMessage {
  /** 消息类型 */
  type: string
  /** 消息文本 */
  value: string
}

interface IChildWindow extends BrowserWindowConstructorOptions {}

/** 通过window.open创建新页面 */
export const createChildWindow = (url: string, config: IChildWindow): Promise<Window> => {
  return new Promise((resolve, reject) => {
    const windowProxy = window.open(url, '_blank', JSON.stringify(config))!
    /** 为了确保子窗口页面已经加载完成，等待子窗口发送指定message才改变promise状态 */
    const readyHandler = (e: MessageEvent<IMessage>) => {
      const msg = e.data
      if (msg.type === 'pageReady') {
        windowProxy.removeEventListener('message', readyHandler)
        resolve(windowProxy)
        return
      }
    }
    windowProxy.addEventListener('message', readyHandler)
  })
}

/** 子页面加载完成 */
export const childWindowMounted = () => {
  window.postMessage({ type: 'pageReady' })
}
