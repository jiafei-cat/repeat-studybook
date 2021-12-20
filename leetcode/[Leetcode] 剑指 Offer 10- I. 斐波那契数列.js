// 递归
function fib(n) {
  const cache = {0: 0n, 1: 1n}
  function _fib(n) {
    if (cache[n] === undefined) {
      cache[n] = _fib(n - 1) + _fib(n - 2)
    }
    return cache[n]
  }

  return _fib(n) % 1000000007n
}


// 迭代
function fib(n) {
  const cache = {0: 0n, 1: 1n}

  for(let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2]
  }

  return cache[n] % 1000000007n
}


// 动态规划 - 滑动窗口
function fib(n) {
  if (n === 0 || n === 1) {
    return n
  }

  let q = 0n
  let p = 1n
  let sum = 0n

  while(--n) {
    sum = q + p
    q = p
    p = sum
  }

  return sum % 1000000007n
}