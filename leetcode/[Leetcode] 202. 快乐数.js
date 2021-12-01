const getNext = n => {
  let total = 0
  while(n > 0) {
    total += Math.pow(n % 10, 2)
    n = ~~(n / 10)
  }

  return total
}

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