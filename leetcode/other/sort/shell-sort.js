// 希尔排序
const N = D.length

for (let gap = N; gap = parseInt(gap / 2);) {
  for (let i = gap; i < N; i++) {
    const k = D[i]
    let j
    for (j = i; j >= gap && k < D[j - gap]; j -= gap) {
      D[j] = D[j - gap]
    }
    const old = D[j]
    D[j] = k
  }
}