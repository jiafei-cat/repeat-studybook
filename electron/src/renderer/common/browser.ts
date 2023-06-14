interface IMessage {
  /** 消息类型 */
  type: string
  /** 消息文本 */
  value: string
}

/** 通过window.open创建新页面，并监听postmessage */
export const createBrowser = (url: string, config: any): Promise<Window> => {
  return new Promise((resolve, reject) => {
    const windowProxy = window.open(url, '_blank', JSON.stringify(config))!

    resolve(windowProxy)

    const readyHandler = (e: MessageEvent<IMessage>) => {
      const msg = e.data
      switch (msg.type) {
        case 'remove':
          windowProxy.removeEventListener('message', readyHandler)
          break
      }
    }
    windowProxy.addEventListener('message', readyHandler)
  })
}

/** 取消postmessage监听 */
export const removeMessageListener = () => {
  const msg = { msgName: `__dialogReady` }

  window.opener.postMessage(msg)
}
