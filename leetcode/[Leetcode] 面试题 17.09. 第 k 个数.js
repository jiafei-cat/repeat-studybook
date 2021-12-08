/**
 * 第k个丑数只有3,5,7素因子，那么k个数肯定是3/5/7互相相乘而来
 */

/**
 * 解答一：暴力解决
 * 将每一项x3 x5 x7，排序+去重
 */
function sortAndUnique(arr) {
  const set = new Set()
  arr.forEach(i => set.add(i))
  return Array.from(set).sort((a, b) => a - b)
}

var getKthMagicNumber = function(k) {
  let arr = [1]
  let i = 0
  while(arr.length <= k) {
    arr.push(arr[i] * 3)
    arr.push(arr[i] * 5)
    arr.push(arr[i] * 7)
    arr = sortAndUnique(arr)
    i++
  }
  return arr[k-1]
};

/**
 * 解答二: 三指针dp
 * 3指针递增交叉相乘防止重复
 * 每次取最小值新增保证了升序
 */
function getKthMagicNumber (k) {
  let arr = [1]
  let p3 = 0
  let p5 = 0
  let p7 = 0
  let i = k
  while (i--) {
    let res3 = arr[p3] * 3
    let res5 = arr[p5] * 5
    let res7 = arr[p7] * 7
    let res = Math.min(res3, res5, res7) // 保证了递增排序
    if (res === res3) p3++
    if (res === res5) p5++
    if (res === res7) p7++
    arr.push(res)
  }

  return arr[k-1]
}