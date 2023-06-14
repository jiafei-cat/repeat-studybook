import { ModelBase } from './ModelBase'

/** 聊天详情信息 */
export class ModelMessage extends ModelBase {
  /** 消息创建时间 */
  createTime?: number
  /** 消息接收时间 */
  receiveTime?: number
  /** 消息内容 */
  messageContent?: string
  /** 聊天ID */
  chatId?: string
  /** 发送人名称 */
  fromName?: string
  /** 发送人头像 */
  avatar?: string
  /** 是否为传入消息 */
  isInMsg?: boolean
}
