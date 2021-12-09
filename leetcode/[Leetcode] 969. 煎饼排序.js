/**
 * 按照思路
 * 1: 每次取最大的数的下标翻转，翻转后最大的数肯定在第一位
 * 2: 在翻转当前数组长度，将最大元素翻转到最后
 * (数组任何元素都可以通过两步翻转到最后)
 */
var pancakeSort = function(arr) {
  const length = arr.length
  const result = []
  let i = 0

  while (i < length - 1) {
    // 步骤一: 找到最大的元素的位置
    const maxNumber = Math.max(...arr.slice(0, arr.length - i))
    const maxNumberIndex = arr.indexOf(maxNumber) + 1

    // 如果最大值的index已经在最后一个位置上了, 跳过
    if (maxNumberIndex === arr.length - i) {
      i++
      continue
    }

    const firstOperationNumber = maxNumberIndex // 第一步操作,翻转最大元素位置
    const secondOperationNumber = arr.length - i // 第二步操作,翻转当前数组长度 - 迭代次数

    // 步骤二: 开始两步翻转
    arr = reverse(arr, firstOperationNumber)
    arr = reverse(arr, secondOperationNumber)

    // 步骤三: 记录操作(翻转1没意义，所以不记录)
    if (firstOperationNumber !== 1) {
      result.push(firstOperationNumber)
    }
    if (secondOperationNumber !== 1) {
      result.push(secondOperationNumber)
    }
    i++
  }
  return result
};

function reverse(arr, length) {
  const _arr = [...arr]
  const _arrLeft = _arr.slice(0, length)
  const _arrRight = _arr.slice(length)

  return _arrLeft.reverse().concat(_arrRight)
}