var calPoints = function(ops) {
  const scoreStack = []

  for (let i = 0; i < ops.length; i++) {
    let length = scoreStack.length
    switch(ops[i]) {
      case '+':
        scoreStack.push(Number(scoreStack[length - 1]) + Number(scoreStack[length - 2]))
      break;
      case 'D':
        scoreStack.push(scoreStack[length - 1] * 2)
      break;
      case 'C':
        scoreStack.pop()
      break;
      default:
        scoreStack.push(ops[i])
      break;
    }
  }

  return scoreStack.reduce((a, b) => +a + +b)
};