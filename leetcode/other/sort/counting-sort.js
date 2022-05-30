const N = 20
const array = Randomize.Array1D({ N, value: () => Randomize.Integer({ min: 0, max: 9 }) })

(function main() {
  const max = Math.max(...array)
  const counts = new Array(max + 1).fill(0)

  for (let i = 0; i < N; i++) {
    const number = array[i]
    counts[number]++
  }

  for (let i = 1; i <= max; i++) {
    counts[i] += counts[i - 1]
  }

  const sortedArray = new Array(N)
  for (let i = N - 1; i >= 0; i--) {
    const number = array[i]
    const count = counts[number]
    sortedArray[count - 1] = number
    counts[number]--
  }
})()
