import { ModelBase } from './ModelBase'

/** 聊天对象信息 */
export class ModelChat extends ModelBase {
  /** 聊天对象名称 */
  fromName?: string
  /** 聊天对象头像 */
  avatar?: string
  /** 最后一条消息时间 */
  sendTime?: number | string
  /** 最后一条消息内容 */
  lastMsg?: string
  /** 是否选中该条消息 */
  isSelected = false
  /**
   * 聊天类型
   * - 0: 单聊
   * - 1: 群聊
   * - 2: 公众号
   * - 3: 文件传输助手
   */
  chatType?: number
}
