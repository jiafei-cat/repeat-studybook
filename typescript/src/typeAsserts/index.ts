// =================================
// 类型断言
// =================================

// 作用: 将重叠关系的数据类型进行互相转换
// 语法格式: 值 as 类型 或者 <类型>值

class Father {
  public name1 = 'father'
}

class Child extends Father{
  // 私有private和被保护protected的区别，基本一致但是继承类只可以访问protected成员,private只能自己使用
  private name3 = '111'
  protected name4 = '222'
  public name2 = 'child'
}

const father = new Father() // father只有name1的提示
const res = father as Child // father有name1和name2的提示

// 当然子类也可断言成父类
const child = new Child() as Father // 只有name1的提示
const child2 = <Father>new Child() // 另一种方式

const child3 = {} as Child // 没有继承关系也可以断言
const child4 = {} as any as Father as Child // 重叠断言(慎用)
