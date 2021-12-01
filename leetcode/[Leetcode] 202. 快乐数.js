const getNext = n => {
  let total = 0
  while(n > 0) {
    total += Math.pow(n % 10, 2)
    n = ~~(n / 10)
  }

  return total
}

const getNext = n => String(n).split('').reduce((pre, cur) => pre + Math.pow(cur, 2), 0)

const isHappy = n => {
  const visited = new Set()
  while (n !== 1 && getNext(n) !== 1) {
    if (visited.has(n)) {
      return false
    }

    visited.add(n)
    n = getNext(n)
  }

  return true
}

const isHappy = n => {
  let fast = n
  let slow = n

  while(fast !== 1 && getNext(fast) !== 1) {
    fast = getNext(getNext(fast))
    slow = getNext(slow)

    if (fast === 1) {
      return true
    }

    if (fast === slow) {
      return false
    }
  }

  return true
}