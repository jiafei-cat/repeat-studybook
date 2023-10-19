function flatArr(arr) {
  return arr.reduceRight((pre, cur) => (typeof cur === 'object' ? flatArr(cur) : [cur]).concat(pre), [])
}