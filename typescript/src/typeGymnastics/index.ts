// Pick
// ==================================
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

// Exclude
// ==================================
type MyExclude<T, K> = T extends K ? never : T
type Test1 = MyExclude<"a" | "b" | "c", "a">

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

// returnType
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any) => infer P ? P : any

type ComplexObject = {
  a: [12, 'foo']
  bar: 'hello'
  prev(): number
}

const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2
type Test3 = MyReturnType<() => string>

export {}