// 全局变量用于存储当前的副作用函数
let activeEffect = null
// 中间函数(注册副作用函数)
function effect(fn) {
  // 全局变量指向当前注册的副作用函数
  activeEffect = fn
  // 执行副作用函数
  // 触发get
  // 拦截到get
  // 存储当前的全局变量activeEffect
  // 完成注册过程
  fn()
}

// 存储属性和属性对应的依赖函数
const bucket = new WeakMap()

// 原始数据
const data = { text: 'hello world' }

const obj = new Proxy(data, {
  get(target, key) {
    // 当前如果没有要注册的副作用函数直接return掉
    if (!activeEffect) return target[key]
    
    // 下面逻辑两层
    // 一层判断当前target有没有拦截属性
    // 二层判断当前target拦截的属性有没有副作用函数
    
    // 当前拦截对象是否有存储的副作用函数
    let depsFnDataList = bucket.get(target)
    
    if(!depsFnDataList) {
      // 如果当前对象没有存储的副作用函数，就先给建立基本存储结构
      // 方便下面存值
      bucket.set(target, (depsFnDataList = new Map()))
    }
    
    // 当前的key有没有副作用函数
    let depsFnKeyList = depsFnDataList.get(key)
  
    if (!depsFnKeyList) {
      // 没有的话也是简历基本存储结构，方便下民存值
      // 这里使用set结构，利于去重
      depsFnDataList.set(key, (depsFnKeyList = new Set()))
    }
    
    // 上述代码不管有没有数据，基本的存储结构都有了
    // 所以这里将当前的副作用函数加入到当前target/key的副作用函数列表中
    depsFnKeyList.add(activeEffect)
      
    // 最后返回属性值
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    // 这里是改变数据后触发副作用函数
    // 也是通过两层判断取值，取到副作用函数后遍历执行
    const depsFnDataList = bucket.get(target)
    if (!depsFnDataList) return
    const depsFnKeyList = depsFnDataList.get(key)
    
    if (!depsFnKeyList) return
    
    depsFnKeyList.forEach(fn => fn())
  }
})