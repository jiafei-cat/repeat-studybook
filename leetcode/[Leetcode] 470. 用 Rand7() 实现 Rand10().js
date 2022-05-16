/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
  // rand2() + rand2() 2~4 3的概率50%
  // 1 + 1 = 2
  // 1 + 2 = 3
  // 2 + 1 = 3
  // 2 + 2 = 4
  // (rand2() - 1) * 2 + rand2() 1~2*2平均概率
  // 0 + 1 = 1
  // 0 + 2 = 2
  // 2 + 1 = 3
  // 2 + 2 = 4
  // (rand3() - 1) * 3 + rand3() 1~3*3平均概率
  // 0 + 1 = 1
  // 3 + 1 = 4
  // 6 + 1 = 7
  // 0 + 2 = 2
  // 3 + 2 = 5
  // 6 + 2 = 8
  // 0 + 3 = 3
  // 3 + 3 = 6
  // 6 + 3 = 9
  // 由上面可以推送出公式: (randX() - 1) * Y + randY() => [1, X * Y]
  // 反之可以通过取余加一(只要是X的倍数)，例如: rand6() % 3 + 1可以得到rand3() / rand6() % 2 + 1可以得到rand2()
  // rand6() % 2 + 1 => rand2
  // 1 % 2 = 1 + 1 = 2
  // 2 % 2 = 0 + 1 = 1
  // 3 % 2 = 1 + 1 = 2
  // 4 % 2 = 0 + 1 = 1
  // 5 % 2 = 1 + 1 = 2
  // 6 % 2 = 0 + 1 = 1
  // rand6() % 3 + 1 => rand3
  // 1 % 3 = 1 + 1 = 2
  // 2 % 3 = 2 + 1 = 3
  // 3 % 3 = 0 + 1 = 1
  // 4 % 3 = 1 + 1 = 2
  // 5 % 3 = 2 + 1 = 3
  // 6 % 3 = 0 + 1 = 1

  // 所以要实现rand10要得到rand10X, 以便rand10X() % 10 + 1 => rand10()
  while(true) {
      const rand49 = (rand7() - 1) * 7 + rand7()
      // 41 ~ 49的部分不采样
      if (rand49 <= 40) {
          return rand49 % 10 + 1
      }
  }

}

// 如何优化？
// 提高采样命中率， 利用公式减少丢弃的样本
function rand10() {
  while(true) {
    const X = rand7()
    let Y = rand7()
    const rand49 = (X - 1) * 7 + Y
    if (rand49 <= 40) { // 拒绝采样9个数
      return rand49 % 10 + 1
    }
    const rand9 = rand49 - 40 
    Y = rand7()
    const rand63 = (rand9 - 1) * 7 + Y
    if (rand63 <= 60) { // 拒绝采样3个数
      return rand63 % 10 + 1
    }
    const rand3 = rand63 - 60
    Y = rand7()
    const rand21 = (rand3 - 1) * 7 + Y
    if (rand21 <= 21) { // 拒绝采样1个数
      return rand21 % 10 + 1
    }
  }
}