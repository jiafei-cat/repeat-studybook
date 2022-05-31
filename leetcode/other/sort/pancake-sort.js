// 煎饼排序
const N = D.length

function flip(start) {
  let idx = 0;
  for (let i = start; i < (start + N) / 2; i++) {
    const temp = D[i]
    D[i] = D[N - idx - 1]
    D[N - idx - 1] = temp
    idx++
  }
}

for (let i = 0; i < N - 1; i++) {
  const currArr = D.slice(i, N)
  const currMax = currArr.reduce((prev, curr, idx) => ((curr > prev.val) ? { idx, val: curr } : prev), {
    idx: 0,
    val: currArr[0],
  });
  if (currMax.idx !== 0) {
    flip(currMax.idx + i, N)
    flip(i, N)
  }
}
