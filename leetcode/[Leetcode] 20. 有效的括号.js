/**
 * 碰到结束括号时，判断栈顶元素是否是对应的关系
 * 是则出栈，否则返回false
 */
var isValid = function(s) {
  // 出栈元素的对应关系
  const map = {')': '(', ']': '[', '}': '{'}
  const stack = []

  for (let i = 0; i < s.length; i++) {
    let curS = map[s[i]]
    let stackTop = stack[stack.length - 1]
    // 当前出栈元素的对应关系是否和栈顶元素相同
    if (curS && stackTop === curS) {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  return !stack.length
};