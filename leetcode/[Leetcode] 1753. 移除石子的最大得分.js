var maximumScore = function(a, b, c) {
  const count = [a, b, c].sort((a, b) => a - b)
  let result = 0

  // 第一步: 
  // 获得最大堆比中堆相差多少(差值与最小堆比较谁最小)
  let cha = Math.min(count[2] - count[1], count[0])
  // 最大堆减去最小值
  count[2] -= cha
  count[0] -= cha
  result += cha // 步骤累加

  // 第二步:
  // 两种情况
  // 减完后最小堆不为0(需要将最小堆平分再减)
  if (count[0] !== 0) {
    // 第三步
    // 小堆不够对半分的情况
    if (count[0] % 2 === 1) {
      count[0] -= 1
    }
    count[1] = count[1] - (count[0] / 2)
    count[2] = count[2] - (count[0] / 2)

    // 加上平分的结果(剩余1肯定是达到不了0的只能留着)
    // 如果这里中大堆减去平分还不为0，下面会将剩余的相加
    result += count[0] 
  }

  // 为0的情况, 直接加最大堆或中堆即可
  result += count[1]
  return result
}