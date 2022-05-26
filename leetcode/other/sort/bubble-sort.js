let N = D.length
let swapped
do {
  swapped = false
  for (let i = 1; i < N; i++) {
    if (D[i - 1] > D[i]) {
      const temp = D[i - 1]
      D[i - 1] = D[i]
      D[i] = temp
      swapped = true
    }
  }
  N--
} while (swapped)