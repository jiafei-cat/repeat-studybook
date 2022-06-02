const N = D.length
let swapped
let gap = N
const shrink = 1.3
do {
  gap = Math.floor(gap / shrink)
  if (gap < 1) {
    gap = 1
  }

  swapped = false
  for (let i = 0; i + gap < N; i++) {

    if (D[i] > D[i + gap]) {
      const temp = D[i]
      D[i] = D[i + gap]
      D[i + gap] = temp

      swapped = true
    }
  }
} while (gap !== 1 || swapped)
