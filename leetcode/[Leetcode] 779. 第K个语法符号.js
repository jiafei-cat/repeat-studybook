var kthGrammar = function(n, k) {
  if (n === 1) {
    return 0
  }

  const n1 = Math.pow(2, n - 1) // 计算第n行长度
  const isLeft = k <= n1 / 2

  if (isLeft) {
    return kthGrammar(n - 1, k)
  } else {
    let val = kthGrammar(n - 1, k - n1 / 2)
    return val === 0 ? 1 : 0
  }

};