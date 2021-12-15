/**
 * 最终转化为相加操作
 * +1,-1都推入栈中
 * 碰到* /去前一个值和当前值运算
 * "1*2-3/4+5*6-7*8+9/10"
 * [[1 * 2], [-3/4], [5*6], [-7*8], [9/10]]
 * [2, 0, 30, -56, 0] => 相加 -24
 */
var calculate = function(s) {
  const stack = []
  let i = 0
  const operation = ['+', '-', '*', '/', ' ']

  while (i < s.length) {
    // 空字符串跳过
    if (s[i] === ' ' || s[i] === '+') {
      i++
      continue
    }

    // / *直接推入栈中待处理
    if (s[i] === '/' || s[i] === '*') {
      stack.push(s[i])
      i++
      continue
    } else {
    // string -number推入到栈中待处理
      let str = s[i]
      while(i+1 < s.length && !operation.includes(s[i+1])) {
        str += s[i+1]
        i++
      }
      stack.push(str)
    }

    const lastOperation = stack[stack.length - 2] // 倒数第二的操作符
    // 运算/ *
    if (lastOperation === '/' || lastOperation === '*') {
      let lastNumber = stack.pop() // 出栈最后一个数字
      stack.pop() // 出栈操作符
      let firstNumber = stack.pop() // 出栈前一个数字

      if (lastOperation === '/') {
        stack.push(parseInt(firstNumber / lastNumber))
      }

      if (lastOperation === '*') {
        stack.push(firstNumber * lastNumber)
      }
      preOperation = '+' // 重置上次操作
    }

    i++
  }

  // 累加结果
  return stack.reduce((a, b) => Number(a) + Number(b))
};


/**
 * 简化版
 */
var calculate = function(s) {
  const stack = []
  let preNumber = ''
  let preOperation = '+' // 上一次推入的操作符，第一次入栈数字认为是+

  for (let i = 0; i < s.length || preNumber; i++) {
    if (s[i] === ' ') {
      continue
    }

    // 只匹配操作符
    if (/\D/.test(s[i])) {
      switch(preOperation) {
        case '+':
          stack.push(preNumber)
        break;
        case '-':
          stack.push(-preNumber)
        break;
        case '*':
          stack.push(stack.pop() * preNumber)
        break;
        case '/':
          stack.push(parseInt(stack.pop() / preNumber))
        break;
      }
      preNumber = '' // 重置数字字符串
      preOperation = s[i] // 记录上一次推入操作符
    } else {
      preNumber += s[i] // 递增拼接数字字符串
    }
  }
  return stack.reduce((a, b) => Number(a) + Number(b))
};