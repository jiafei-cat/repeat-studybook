// import './referenceAttributes' // 类的引用属性
// import './overload' // 函数/方法/构造器/泛型重载
// import './singletonPattern' // 单例模式
// import './inherit' // 继承
// import './typeGuard' // 类型守卫
import './typeAsserts' // 类型断言
// import './tips' // 小技巧
interface Obj {
  a: number;
  b: number;
  c: number;
  d: number;
}

type test<T extends {[index: string]: any}> = T[number]
type test2 = test<Obj>