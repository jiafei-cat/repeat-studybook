// =================================
// 获取微信消息 - 函数重载
// =================================
console.log('函数重载 ==================== start')
type MessageType = "image" | "audio" | string // 微信消息类型
// 对象类型
type Message = {
	id: number
  type: MessageType
  sendMessage: string
}

const messages: Message[] = [
  {id: 1, type: 'image', sendMessage: '1111'},
  {id: 2, type: 'audio', sendMessage: '2222'},
  {id: 3, type: 'audio', sendMessage: '3333'},
  {id: 3, type: 'audio', sendMessage: '4444'},
]

// =================================
// 不使用函数重载
// 缺点: 1.可读性差
function getMessageWeixin(payload: MessageType | number): Message | Array<Message> | undefined {
	if (typeof payload === 'number') {
    return messages.find(msg => msg.id === payload)
  } else {
    return messages.filter(msg => msg.type === payload)
  }
}

console.log(getMessageWeixin(1))

// 这里报错: 为什么报错?
// 第一个错:(对象可能为“未定义”)
// 函数可能返回undefined
// 第二个错:(类型“Message | Message[]”上不存在属性“id”。类型“Message[]”上不存在属性“id”)
// 因为这里提示该函数返回的是一个联合类型, 联合类型会取交集，交集上面没有id属性
// 为什么ts没有推导出来返回的是Message类型?
// ts没办法在调用方法时，根据传的值推导出最终的返回类型(自定义守卫有这个功能)，只能运行之后才知道返回类型
// console.log(getMessageWeixin(1).id)

// 解释上面的第二个错误: number | string联合类型的交集只有3个方法
let a:number | string = 1
a.toString()

// 那么如何让该函数确定返回的是Message类型呢?

// 断言
// 方式1
let result = <Message>getMessageWeixin(1)
console.log(result.id) // 提示正确且不报错
// 方式2
let result2 = getMessageWeixin(1) as Message
console.log(result2.id) // 提示正确且不报错


// =================================
// 使用函数重载
// 函数签名 = 函数名称+函数参数+函数参数类型+返回值类型(不包括函数体)
// 函数重载规则:
// 1. 由一个实现签名+一个或者多个重载签名合成 (实现签名就是下面有函数体的，重载签名就是下面没有函数体的)
// 2. 但外部调用函数重载定义函数时，只能调用重载签名，不能调用实现签名 (简单来说就是你调用这个函数，参数是过重载签名的)
// 3. 调用重载函数时，会根据传递来的参数判断你调用的是哪个函数
// 4. 只有一个函数体，只有实现签名配备了函数体，所有的重载签名都只是签名，没有配备函数体
// 总结: 无论重载签名有几个参数，参数类型是何种类型，实现签名都可以是一个无参函数签名，
//      实现签名参数个数可以少于重载签名的参数个数, 但实现签名如果准备包含重载签名的某个位置的参数
//      那么实现签名必须
// 简单来说: 重载签名其实就是实现签名的函数参数，函数返回值的分支解释(就是你的重载签名的函数参数和返回值都要被包含在实现签名里)

function getMessageWeixinOverload(payload: MessageType): Array<Message>
function getMessageWeixinOverload(payload: number): Message | undefined
function getMessageWeixinOverload(payload: MessageType | number): Message | Array<Message> | undefined {
	if (typeof payload === 'number') {
    return messages.find(msg => msg.id === payload)
  } else {
    return messages.filter(msg => msg.type === payload)
  }
}

let result3 = getMessageWeixinOverload(1123)
console.log(result3?.id) // 提示正确
let result4 = getMessageWeixinOverload('www')
console.log(result4.map(i => i.id)) // 提示正确


// 函数重载的优点: 利于拓展
// 现在我们想限定根据string获取message返回的条数，给重载签名增加limit参数
function getMessageWeixinOverload2(payload: MessageType, limit: number): Array<Message>
function getMessageWeixinOverload2(payload: number): Message | undefined
function getMessageWeixinOverload2(payload: MessageType | number, limit?: number): Message | Array<Message> | undefined {
	if (typeof payload === 'number') {
    return messages.find(msg => msg.id === payload)
  } else {
    return messages.filter(msg => msg.type === payload).slice(0, limit)
  }
}

// 这里我们拓展增加第二个参数限定返回的条数，怎么去保证类型正确?
let result5 = getMessageWeixinOverload2('audio', 2)
console.log(result5)
// function getMessageWeixinOverload2(payload: MessageType, limit: number): Array<Message>
// 第二个重载签名会报错，因为没有考虑第二个重载签名第二参数的情况
// function getMessageWeixinOverload2(payload: number): Message | undefined
// function getMessageWeixinOverload2(payload: MessageType | number, limit: number): Message | Array<Message> | undefined {
// ...

// 如何去解决
// 1.给实现签名的形参改为可选参数 limit?: number
// function getMessageWeixinOverload2(payload: MessageType | number, limit?: number): Message | Array<Message> | undefined {
// 2.给实现签名的形参加默认参数 limit: number = 1
// function getMessageWeixinOverload2(payload: MessageType | number, limit: number = 1): Message | Array<Message> | undefined {

// unknown只能作为父类类型，不能作为子类
// 里面例子a2就会报错
let a1:unknown = 1
// @ts-ignore
let a2:number = a1
// any就可以，这也是any和unknown的区别
// any可以赋给任意子类
let a3:any = 1
let a4:number = a3


console.log('函数重载 ==================== end')