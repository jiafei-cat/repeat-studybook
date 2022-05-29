const N = 25
const K = 5
const array = Randomize.Array1D({ N, value: () => Randomize.Integer({ min: 0, max: 999 }) })

(function main() {
  const buckets = [...new Array(K)].map(() => [])

  const max = Math.max(...array)

  for (let i = 0; i < N; i++) {
    const number = array[i]
    const bucketIndex = Math.floor(number / (max + 1) * K)
    const bucket = buckets[bucketIndex]
    bucket.push(number)

    let j = bucket.length - 1
    while (j > 0 && bucket[j - 1] > bucket[j]) {
      const temp = bucket[j - 1]
      bucket[j - 1] = bucket[j]
      bucket[j] = temp
      j--
    }
  }

  let i = 0
  for (let bucketIndex = 0; bucketIndex < K; bucketIndex++) {
    const bucket = buckets[bucketIndex]
    for (let j = 0; j < bucket.length; j++) {
      array[i] = bucket[j]
      i++
    }
  }
})()
