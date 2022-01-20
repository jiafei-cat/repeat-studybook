describe('模拟call的实现', () => {
  it('测试call方法', () => {
    const { call } = require('../index')
    Function.prototype.myCall = call
  
    const obj = { a: 1 }
    const f = function (...args) {
      return { context: this, args }
    }
  
    expect(f.myCall(obj, 1, 2)).toEqual({ context: { a: 1 }, args: [1, 2] })
  })
})