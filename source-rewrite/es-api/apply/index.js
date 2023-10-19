module.exports = function apply (context, args) {
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}