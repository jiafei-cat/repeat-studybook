describe('模拟bind实现', () => {
  it('测试bind方法', () => {
    const { bind } = require('../index')
    Function.prototype.myBind = bind

    const obj = { a: 1 }
    const f = function (...args) {
      return { context: this, args }
    }

    expect(f.bind(obj, 1, 2)(3, 4)).toEqual({
      context: { a: 1 },
      args: [1, 2, 3, 4],
    })
  })
})