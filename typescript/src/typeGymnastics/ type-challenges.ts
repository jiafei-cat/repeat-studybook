// 记录types challenges做题记录
// 来自: https://github.com/type-challenges/type-challenges

// 4・实现 Pick
{
  type MyPick<T, P extends keyof T> = {
    [K in P]: T[K]
  }
  
  interface Test {
    a: number;
    b: number
  }
  type test = MyPick<Test, 'b'>
}


// 7・实现 Readonly
{
  type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  interface Test {
    a: number;
    b: number
  }
  type test = MyReadonly<Test>

}

// 11・元组转换为对象
{
  type TupleToObject<T extends readonly any[]> = {
    [P in T[number]]: P
  }
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
  
  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
}

// 14・第一个元素
{
  type First<T extends any[]> = T extends [a: infer P, ...args: any] ? P : never
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]
  
  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
} 

// 18 - 获取元组长度
{
  type Length<T extends any[]> = T extends {length: infer P} ? P : never
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
  
  type teslaLength = Length<tesla> // expected 4
  type spaceXLength = Length<spaceX> // expected 5
}

// 43・Exclude
{
  type MyExclude<T, U> =  T extends U ? never : T

  type Test = 'a' | 'b'
  type test = MyExclude<Test, 'b'>
}

//  189・Awaited
{
  // 测试用例中Promise可能继续返回Promise, 所以需要递归判断
  type MyAwaited<T extends Promise<any>> = T extends Promise<infer P> ? P extends Promise<any> ? MyAwaited<P> : P : T
}

// 268・If
{
  type If<T extends boolean, P, K> = T extends true ? P : K
  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
}

// 533・Concat 
{
  type Concat<T extends any[], P extends any[]> = [...T, ...P]
  type Result = Concat<[1], [2]> // expected to be [1, 2]
}

// 898・Includes
{
  // 解法历史: 一
  // 这里T[number]并不是distributive, 所以并不能这样解决
  // type Includes<T extends any[], P> = T[number] extends P ? true : false

  // 解法历史: 二
  // 特殊测试用例通不过: type test = true extends boolean ? true : false
  // type Includes<T extends any[], U> = 'has' extends {
  //   [K in keyof T]: T[K] extends U ? 'has' : 'no'
  // }[number] ? true : false

  // 最终解答:
  // 增加Equal判断类型工具, 利用rest对元组每一项进行递归判断
  type IsAny<T> = 0 extends (1 & T) ? true : false
  type Equal<S, T> = IsAny<S> extends true
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

  type Includes<T extends readonly any[], U> = 
  T extends [infer Entry, ...infer Rest]
    ? Equal<Entry, U> extends true
      ? true
      : Includes<Rest, U> // 递归继续判断rest
    : false

  type test = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>
  type test2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>
}

// 3057・Push
{
  type Push<T extends any[], U> = [...T, U]
}

// 3060・Unshift
{
  type Unshift<T extends any[], U> = [U, ...T]
}

// 3312・Parameters
{
  type MyParameters<T extends (...params: any) => any> = T extends (...params: infer P) => any ? P : never

  const foo = (arg1: string, arg2: number): void => {}
  const bar = (arg1: boolean, arg2: {a: 'A'}): void => {}
  const baz = (): void => {}

  type test1 = MyParameters<typeof foo>
  type test2 = MyParameters<typeof bar>
  type test3 = MyParameters<typeof baz>
}