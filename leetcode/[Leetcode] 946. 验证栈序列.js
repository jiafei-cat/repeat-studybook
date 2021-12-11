/**
 * 思路步骤:
 * 1. 将pushed元素push入stack
 * 2. 栈顶元素与popped元素相同时开始出栈
 * 3. 检测最后栈元素数量
 */
var validateStackSequences = function(pushed, popped) {
  const stack = []
  for(let i = 0, j = 0; i < pushed.length; i++) {
    // 步骤一: 将pushed元素push入stack
    stack.push(pushed[i])
    // 步骤二: 碰到popped元素开始出栈
    while (stack[stack.length - 1] === popped[j] && j < popped.length) {
      stack.pop()
      j++
    }
  }
  // 步骤三: 检测最后栈元素数量
  return !stack.length
};