// import './referenceAttributes' // 类的引用属性
// import './overload' // 函数/方法/构造器/泛型重载
// import './singletonPattern' // 单例模式
// import './inherit' // 继承
// import './typeGuard' // 类型守卫
import './typeAsserts' // 类型断言
// import './tips' // 小技巧


interface Array2 {
  0: number
  1: string
}

const a: Array2 = [1,'2',3]
const b: Array<number> = [1,2,3,4]

const list = [1, 2, 3] as const // TS3.4 syntax
type NeededUnionType = typeof list[number]

type List2 = [1, 2, 3]
type List3 = keyof List2
type List4 = {
  [P in List2[number]]: P
}