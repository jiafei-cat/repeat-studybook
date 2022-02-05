// =================================
// 自定义守卫(自定义类型守卫)
// =================================

// 什么是类型守卫
// TS 在遇到以下这些条件语句时，会在语句的块级作用域内「收紧」变量的类型，这种类型推断的行为称作类型守卫 (Type Guard)。
// 类型判断：typeof
// 实例判断：instanceof
// 属性判断：in
// 字面量相等判断：==, ===, !=, !==
// 等等...
// 类型守卫可以帮助我们在块级作用域中获得更为精确的变量类型，从而减少不必要的类型断言。下面通过一些具体的例子来帮助理解这个看起来有点抽象的概念
function test(input: string | number) {
  if (typeof input == 'string') {
    // 这里 input 的类型「收紧」为 string
  } else {
    // 这里 input 的类型「收紧」为 number
  }
}

class Foo {}
class Bar {}

function test2(input: Foo | Bar) {
  if (input instanceof Foo) {
    // 这里 input 的类型「收紧」为 Foo
  } else {
    // 这里 input 的类型「收紧」为 Bar
  }
}

// 注意：一旦上述条件不是直接通过字面量书写，而是通过一个条件函数来替代时，类型守卫便失效了，如下面的 isString 函数
// 因为 TS 只能推断出 isString 是一个返回布尔值的函数，而并不知道这个布尔值的具体含义。
// 然而在日常的开发中，出于优化代码结构等目的，上述的「替换」情形是非常常见的，这时为了继续获得类型守卫的推断能力，就要用到自定义守卫
function isString (input: any) {
  return typeof input === 'string'
}

function foo (input: string | number) {
  if (isString(input)) {
    // 这里 input 的类型没有「收紧」，仍为 string | number
  } else {
    // 这里也一样
  }
}


// 自定义守卫
// 自定义守卫通过 {形参} is {类型} 的语法结构，来给上述返回布尔值的条件函数赋予类型守卫的能力
function betterIsString (input: any): input is string { // 返回类型改为了 `input is string`
  return typeof input === 'string'
}

class SuperHero { // 超级英雄
  readonly name!: string
}
class Batman extends SuperHero { // 蝙蝠侠继承自超级英雄
  private muchMoney!: true // 私有很多钱
}

// 判断任意对象是不是蝙蝠侠的函数
function isBatman (man: any): man is Batman {
  return man && man.helmet && man.underwear && man.belt && man.cloak
}

function foo2 (hero: SuperHero) {
  if (isBatman(hero)) {
    // hero 是蝙蝠侠
  } else {
    // hero 是别的超级英雄
  }
}