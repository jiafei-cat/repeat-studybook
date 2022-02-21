// 实现TS自带工具类型
// ==================================
// interface
// ==================================

// Partial
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// Required
type MyRequired<T> = {
  [P in keyof T]-?: T[P]
}

// Readonly
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

// Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}


// Omit
interface Todo {
  title: string
  description: string
  completed: boolean
}

type ExcludeKey<T, K> = {
  [P in keyof T]: P extends K ? never : P
}[keyof T]

type MyOmit<T, K> = {
  [P in ExcludeKey<T, K>]: T[P]
}

// 内置实现
type MyOmit2<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type Test2 = Omit<Todo, 'description'>

// ==================================
// Union type
// ==================================

// Exclude
type MyExclude<T, K> = T extends K ? never : T
type MyExcludeTest = MyExclude<"a" | "b" | "c", "a"> // 'b' | 'c'

// Extract
type MyExtract<T, K> = T extends K ? T : never
type MyExtractTest = MyExtract<"a" | "b" | "c", "a"> // 'a'

// NonNullable
type MyNonNullable<T> = T extends null | undefined ? never : T;
type MyNonNullableTest = NonNullable<"a" | "b" | "c" | null | undefined> // 'a'


// Record
type MyRecord<T extends keyof any, K> = {
  [P in keyof T]: K
}
type MenuKey = 'home' | 'about' | 'more';
interface Menu {
  label: string;
  hidden?: boolean;
}

type MyRecordTest = MyRecord<MenuKey, Menu> 

{
  // Equal history
  // any/never/特殊union通不过
  type EqualV1<S, T> = S extends T ? T extends S ? true : false : false
  type testV1_1 = EqualV1<never, number> // result => never
  type testV1_11 = EqualV1<any, never> // result => never
  type testV1_2 = EqualV1<any, string> // result => boolean, any类型特殊处理，会处理成trueType和falseType得到 true | false, 交叉得boolean
  type testV1_3 = EqualV1<1 | number & {}, number> // result => boolean, 分配判断得到 false ｜ true, 交叉得boolean

  // 不让其distributive, 可以解决never和特殊union问题
  // 还是无法解决any
  type EqualV2<S, T> = [S] extends [T] ? [T] extends [S] ? true : false : false
  type testV2_1 = EqualV2<1 | number & {}, number> // result => true
  type testV2_2 = EqualV2<never, never> // result => true
  type testV2_3 = EqualV2<any, number> // result => true

  // 增加any判断
  type IsAny<T> = 0 extends (1 & T) ? true : false // 利用any与任何类型的交集都是any的特性

  type EqualV3<S, T> = IsAny<S> extends true
    ? IsAny<T> extends true
      ? true
      : false
    : IsAny<T> extends true
    ? false
    : [S] extends [T]
    ? [T] extends [S]
      ? true
      : false
    : false
  type testV3_1 = EqualV3<1 | number & {}, number> // result 
}
// ==================================
// function
// ==================================

// ConstructorParameters
type MyConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never
class Person {
  constructor(name: string, age?: number) {}
}
type MyConstructorParametersTest = MyConstructorParameters<typeof Person>; // [name: string, age?: number]

// Parameters
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
type T0 = MyParameters<() => void>; // []
type T1 = MyParameters<(x: number, y?: string) => void>; // [x: number, y?: string]

// returnType
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any) => infer P ? P : any

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2
type MyReturnTypeTest = MyReturnType<() => string>

export {}