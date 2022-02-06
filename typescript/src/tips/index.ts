// =================================
// TS小技巧
// =================================



// tips-1: 如何不准引用数据类型的内部属性被修改
// const声明的数组对象内部还是可以被修改，如何使用TS去限制
const arr = [10, 30, 40, 'abc']
arr[0] = 100

const arr2 = [10, 30, 40, "abc"] as const
// arr2[0] = 100 报错: 无法复制，提示是readonly

// 作为函数参数如何不允许函数内部修改引用数据类型 前面加readonly
function showArr(arr: readonly any[]) {//类型“readonly any[]”中的索引签名仅允许读取。
  // arr[0] = 100 报错: 无法复制，提示是readonly
  console.log(arr)
}

showArr(arr)

export {}