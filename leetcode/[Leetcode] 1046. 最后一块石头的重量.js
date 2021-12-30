// 暴力 - 每次粉碎完后排序
var lastStoneWeight = function(stones) {
  let arr = stones.sort((a, b) => b - a)
  while(arr.length > 1) {
    let x = arr.shift()
    let y = arr.shift()
    let cha = Math.abs(y - x)
    arr.push(cha)

    arr = arr.sort((a, b) => b - a)
  }
  return arr[0]
}

// 