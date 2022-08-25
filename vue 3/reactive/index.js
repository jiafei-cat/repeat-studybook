const data = { text: 'hello world'}

let activeEffect = null

const bucket = new WeakMap()


function effect(fn) {
  const effectFn = () => {
    activeEffect = effectFn
    cleanup(effectFn)
    fn()
  }
  effectFn.deps = []
  effectFn()
  // activeEffect = fn
  // fn()
}

function cleanup(effectFn) {
  effectFn.deps.forEach(map => map.delete(effectFn))
  effectFn.deps.length = 0
}

function track (target, key) {
  let objBucket = bucket.get(target)

  if (!objBucket) {
    objBucket.set(target, objBucket = new Map())
  }

  let keyBucket = objBucket.get(key)
  if (!keyBucket) {
    keyBucket.set(target, keyBucket = new Set())
  }
  activeEffect.deps.push(keyBucket)
  keyBucket.add(activeEffect)
}

function tigger(target, key) {
  const objBucket = bucket.get(target)
  if (!objBucket) {
    return
  }
  const keyBucket = objBucket.get(key)
  if (!keyBucket) {
    return
  }
  // 这里会有无限循环问题
  // 执行fn,触发cleanup,keyBucket删除activeEffect函数
  // 触发get又将activeEffect函数加入
  // 因为Set数据格式特性(被访问过的值再次加入Set如果循环没有结束，会继续访问被删除的值)
  // keyBucket.forEach(fn => fn())
  
  // 可以重新用个Set去遍历执行effectFn
  // 这样避免了无限循环问题
  const effectsToRun = new Set(keyBucket)
  effectsToRun.forEach(fn => fn())
}

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    tigger(target, key)
  }
})

effect(() => {
  document.body.innerText = obj.text
})