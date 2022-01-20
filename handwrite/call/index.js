module.exports = function call(context, ...args) {
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}