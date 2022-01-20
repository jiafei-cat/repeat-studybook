module.exports = function apply (context, args) {
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}