// =================================
// 方法重载
// =================================
console.log('方法重载 ==================== start')
// 方法签名 = 方法名称+方法参数+方法参数类型+返回值类型(不包括方法体)
// 1. 对数组进行封装，让增删改查更好用
// 2. 提供get, remove, add
// 其中remove的方法有两个，我们用方法重载来实现

type StudentType = {
  name: string
  age: number
}

class ArrayList {
  // 第一步: 定义一个引用属性
  // constructor(public element:object[]) {
  constructor(public element:Array<StudentType>) {

  }
  // 第二步: 根据索引来查询数组中指定元素
  get(index:number) {
    return this.element[index]
  }

  // 第三步: 显示
  show() {
    this.element.forEach(i => console.log(i))
  }

  // 第四步: 删除
  remove(value:number):number 
  remove(value:StudentType):StudentType
  remove(value:number | StudentType):number | StudentType {
    this.element = this.element.filter((ele, index) => {
      if (typeof value === 'number') {
        return value !== index
      } else {
        return value !== ele
      }
    })
    return value
  }
}

let student1 = { name: '111', age: 11 }
let student2 = { name: '222', age: 22 }
let student3 = { name: '333', age: 33 }

let arr = new ArrayList([student1, student2, student3])
arr.show()
console.log('========')
console.log(`删除第${arr.remove(0)}个元素`)
arr.show()

console.log('方法重载 ==================== end')