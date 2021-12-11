/**
 * 思路:
 *两遍去无效括号方案
 *思路:
 *第一遍，从左边，把不符合规则的)剔除
 *第二遍，从右边，把不符合规则的(剔除
 *例子:
 *情况一: ))((
 *情况二: lee(t(c)o)de 
 */
var minRemoveToMakeValid = function(s) {
  const leftRemove = removeInvalid(s, '(')
  const rightRemove = removeInvalid(leftRemove.reverse(), ')')

  return rightRemove.reverse().join('')
};

function removeInvalid (s, symbol) {
  const map = {'(' : ')', ')': '('}
  const stack = []
  let count = 0
  for (let i = 0; i < s.length; i++) {
    stack.push(s[i])
    if (s[i] === symbol) {
      count += 1
    }
    if (s[i] === map[symbol]) {
      if (count <= 0) {
        stack.pop()
      } else {
        count -= 1
      }
    }
  }
  return stack
}