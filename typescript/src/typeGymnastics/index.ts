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