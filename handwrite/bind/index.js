module.exports = function bind(context, ...args) {
  return () => {
    context = context || window
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args, ...arguments)
    delete context[fn]
    return result
  }
}