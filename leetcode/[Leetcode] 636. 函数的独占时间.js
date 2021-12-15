/**
 * 根据题目的意思
 * 任务是有特点的就是一个任务包含另一个任务执行，所以栈非常适合解决这道题
 * 我们使用一个结果数组，和任务栈，结果数组根据不同任务栈的进出存储结果
 * 任务栈入栈出栈步骤:
 * 0任务start入栈，结果数组0项值为0
 * 0任务end出栈，更新结果数组0项的值 / 1任务入栈，更新任务栈顶任务的结果数组值(当前)
 * 
 * ["0:start:0","1:start:2","2:end:5","0:end:6"]
 * 任务栈:   [0] -> [0, 1] -> [0]    -> [0]
 * 结果数组: [0] -> [2, 0] -> [2, 4] -> [3, 4]
 * 实现细节: 
 * 1. 需要一个pre记录上一次任务时间(不管什么类型任务开始结束都要计算当前时间和上次时间的差值)
 * 2. end任务上次时间为什么要+1，因为结束任务的时间不是闭合的要加1
 */
var exclusiveTime = function(n, logs) {
  const stack = [] // 任务栈
  const result = [] // 结果数组
  let pre = 0 // 上次任务时间，用于计算当前任务时间
  for (let i = 0; i < logs.length; i++) {
    // 任务类型-任务状态-任务时间
    const [taskType, taskStatus, taskTime] = logs[i].split(':')
    // 栈顶任务
    const top = stack.length ? stack[stack.length - 1] : 0
    // 开始任务: 计算上次栈顶任务
    if (taskStatus === 'start') {
      if (stack.length) {
        result[top] += Number(taskTime) - pre
      }
      result[taskType] = (result[taskType] || 0 )
      stack.push(taskType)
      pre = Number(taskTime)
    } else {

      result[top] += Number(taskTime) - pre + 1
      stack.pop()
      pre = Number(taskTime) + 1
    }
  }
  return result
}