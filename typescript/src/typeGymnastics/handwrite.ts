interface Action<T> {
  payload?: T;
  type: string;
}
// 假设有Modle这样一个interface
interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(action: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}
// 实现type Connect
// 保留属性为函数类型，其余的摒弃掉
// 把函数类型转化为<T, U>(args: T) => Action<U>

// 实现Connect类型工具
// type Result =Connect<Module>;
// Result = {
//   asyncMethod<T, U>(input: T): Action<U>;
//   syncMethod<T, U>(action: T): Action<U>; 
// }

// 第一步: 提取出目标key
type FunctionPick<T> = {
  [P in keyof T]: T[P] extends Function ? P : never // 将不是函数的值转为never类型
}[keyof T] // 过滤掉never类型

// 第二步: 通过两个目标函数的函数类型将目标函数转为题目要求函数类型
type FunctionTransform<F> = F extends (action: Promise<infer T>) => Promise<Action<infer U>>
  ? <T, U>(args: T) => Action<U>
  : F extends (action: Action<infer T>) => Action<infer U>
    ? <T, U>(args: T) => Action<U>
    : F

// 组合使用
type Connect<T> = {
  [P in FunctionPick<T>]: FunctionTransform<T[P]>
}

type Result =Connect<Module>;
