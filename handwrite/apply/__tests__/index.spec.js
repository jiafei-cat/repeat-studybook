describe('模拟apply的实现', () => {
  it('测试apply方法', () => {
    const { apply } = require('../index')
    Function.prototype.myApply = apply

    const obj = { a: 1 }
    const f = function (...args) {
      return { context: this, args }
    }

    expect(f.myApply(obj, [1, 2])).toEqual({ context: { a: 1 }, args: [1, 2] })
  })
})