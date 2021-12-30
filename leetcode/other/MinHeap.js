
// 适合解决TopK排序问题，只对部分进行排序，不需要全排序
// 冒泡实现
class MinHeap {
  constructor(data = []) {
    this.data = data
    this.heapify() // 初始化排序调整
  }

  heapify() {
    if (this.size() < 2) {
      return
    }

    for (let i = 1; i < this.size(); i++) {
      this.bubbleUp(i)
    }
  }

  comparator(a, b) {
    return a - b
  }

  /**
   * 获取最小堆的值
   */
  peek() {
    return this.size() === 0 ? null : this.data[0]
  }

  /**
   * 添加元素
   * 思路: 在底部叶子节点增加新元素，再将该节点往上遍历与上级元素比较互换位置
   */
  offer(node) {
    this.data.push(node)
    this.bubbleUp(this.size() - 1) // 推入后调整位置维持最小堆特性
  }

  /**
   * 删除根节点
   * 思路: 将最后一个节点替换掉头节点，再往下比较调整节点
   */
  poll() {
    if(this.size() === 0) {
      return null
    }
    const root = this.data[0]
    const last = this.data.pop()

    if (this.size() !== 0) {
      this.data[0] = last
      this.bubbleDown(0)
    }

    return root
  }

  /**
   * 调整index节点的位置 - 向上
   */
  bubbleUp(index) {
    while (index > 0) {
      // 为什么通过位运算右移一位就可以得到父节点的index
      // 子节点2i + 1和2i + 2要得到父节点需要, (2i+1-1) / 2 或 (2i+2-1) / 2 (取整)
      // 为了取整方便整洁通过位运算右移1为(右移一位相当于除以2)
      let parentIndex = (index - 1) >> 1
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        // 当前节点大于父节点，调整结束
        break
      }
    }
  }

  /**
   * 调整index节点的位置 - 向下
   * 思考: 向下比较换位的时候，如何保证换上来的节点比另一边的节点小?
   * 先让index成为left或right，再让left和right比较，谁小谁和节点互换
   */
  bubbleDown(index) {
    const lastIndex = this.size() - 1
    while(true) {
      const left = (2 * index) + 1
      const right = (2 * index) + 2
      let findIndex = index

      // 下面是判断如果比左右子节点大，是和左换位置还是右换位置

      // 如果左大，替换的目标index为left
      if (left <= lastIndex && this.comparator(this.data[findIndex], this.data[left]) > 0) {
        findIndex = left
      }

      // 如果左大这里还会和右对比，左右谁最小替换上去
      if (right <= lastIndex && this.comparator(this.data[findIndex], this.data[right]) > 0) {
        findIndex = right
      }

      // 换位
      if (findIndex !== index) {
        this.swap(findIndex, index)
        // 换完继续和左右节点比较
        index = findIndex
      } else {
        // 当前节点小于左右节点，调整结束
        break
      }
    }
  }

  swap(a, b) {
    // 1. 中间变量存储交换位置
    // let temp = this.data[a]
    // this.data[a] = this.data[b]
    // this.data[b] = temp
    // 2. 差值交换位置
    // this.data[a] = this.data[a] + this.data[b]
    // this.data[b] = this.data[a] - this.data[b]
    // this.data[a] = this.data[a] - this.data[b]
    // 3. 解构交换位置
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]]
  }

  /**
   * 计算长度
   */
  size() {
    return this.data.length
  }
}

export default MinHeap