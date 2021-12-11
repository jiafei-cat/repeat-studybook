/**
 * 思路:
 * 利用一个计数变量记录当前是不是最外层括号
 * 当最外层入栈是计数为1，出栈时候计数为0，通过这个两个条件将最外层括号去除不入栈
 */
var removeOuterParentheses = function(s) {
  let pushStackNumber = 0
  const stack = []
  for (let i = 0; i < s.length; i++) {
    s[i] === '(' ? pushStackNumber ++ : pushStackNumber--

    if (s[i] === '(' && pushStackNumber !== 1) {
      stack.push('(')
    }
    if (s[i] === ')' && pushStackNumber !== 0) {
      stack.push(')')
    }
  }
  return stack.join('')
};

// 简化
var removeOuterParentheses = function(s) {
  let count = 0
  let str = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' && count++ !== 0) str += '('
    if (s[i] === ')' && count-- !== 1) str += ')'
  }
  return str
}