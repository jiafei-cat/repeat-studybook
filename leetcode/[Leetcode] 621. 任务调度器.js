/**
 * 构造法
 * 四边形的宽为n+1(+1是因为不能纯冷却，还是要执行任务的)
 * 四边形的长为最多任务的数量-1(根据题目最后一行不需要冷却)
 * 最后一行数量是: 与最多数量一样多的种类
 * 依照题目可得公式: (n+1) * (最多任务的数量 - 1) + 与最多数量一样多的种类
 */
 var leastInterval = function(tasks, n) {
  if (n === 0) {
    return tasks.length
  }
  // 第一步: 统计每种任务的数量
  const result = {}
  tasks.forEach(i => result[i] = (result[i] ? result[i] : 0) + 1 )

  const maxNumber = Math.max(...Object.values(result)) // 任务数最多的数
  const maxNumberTypeNumber = Object.values(result).reduce((pre, cur) => {
    return cur === maxNumber ? pre + 1 : pre 
  }, 0) // 有多少种与任务数最多的数一样的数

  const width = n + 1
  const height = maxNumber - 1
  const theLastTaskNumber = maxNumberTypeNumber

  const area = width * height + theLastTaskNumber

  // 为什么要取最大值?
  // 因为在长*宽出来的结果最优的情况是宽是任务种类，长是任务数量
  // 如果有小于最多数量任务的任务的情况，
  return Math.max(area, tasks.length)
};