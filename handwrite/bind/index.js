module.exports = function bind(context, ...args) {
  return () => {
    context.fn = this
    const result = context.fn(...args, ...arguments)
    delete context.fn
    return result
  }
}