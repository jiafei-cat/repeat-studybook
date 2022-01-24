const fs = require('fs')
class localStorage {
  static getItem(key:string) {}
  static setItem(key:string, value: string) {}
}
// 如何是普通类改为单例模式
// 1. 把构造器设置为私有，不允许外部来创建类的实例
// 2. 至少提供一个外部使用的方法或属性，外部通过这个方法属性来得到一个实例，所以这个方法应该是静态方法
// 3. 外部调用第二部提供的静态方法获取一个对象
export default class MyLocalStorage {
  // 1. private私有修饰符
  private constructor() {

  }

  // 这里也得是静态属性才能被静态方法访问
  static instance: MyLocalStorage
  // 2. 提供一个外部访问的方法
  // 静态方法
  // 1. 带static关键字的方法是一个静态方法
  // 2. 静态方法和对象无关，外部的对象变量不能调用静态方法和静态属性
  //    静态方法/属性，实例对象无法访问，只能通过类访问(或者通过构造函数访问，挂在构造函数或类上的)
  //    原型方法属性, 与上面相反，只能实例对象访问，通过构造函数访问不了(挂在protoType上的)
  // 3. 外部可以通过类名来调用
  public static getInstance() {
    if (!this.instance) {
      this.instance = new MyLocalStorage()
    }
    return this.instance
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem(key: string) {
    let value = localStorage.getItem(key)

    return value !== null ? JSON.stringify(value) : null
  }
}
// TS类静态方法/属性 - 九大问题
// 1. 外部如何调用TS类的静态成员: 类名直接调用静态成员
// 2. TS类静态方法如何调用其他静态成员: 直觉使用this
// 3. 静态方法可以访问原型方法和属性吗？反过来呢？: 都不可以
// 4. 对象变量(实例对象)是否可以访问静态方法: 不能
// 5. 一个静态方法改变了静态属性，其他静态方法或者其他访问都是最新值
// 6. 静态成员保存在哪里？何时分配的的内存空间: 声明类的时候就已经分配了
// 7. 静态方法/属性和原型方法/属性区别: 
//    原型对象空间上的方法/属性用来提供给该类的所有实例对象变量共用的方法或属性，没有实例对象就没有意义
//    而静态方法或静态属性属于类，可以通过类来直接访问
// 8. 静态方法是否可以接受一个对象实例来作为方法的参数？可以，实例化后将实例传给静态方法，或者使用call/apply/bind将静态方法内部this指向实例
// 9. 什么时候应该使用静态方法/属性?
//    1. 单例模式 - 当外部不能实例对象，只能借助内部静态方法实例的时候
//    2. 当类中某个方法不需要调用原型方法/属性时,而且调用原型方法/属性导致逻辑错误
//    3. 当一个类中某个方法只有一个或者 1-2个 对象属性，而且更重要的是，你创建这个类的对象毫无意义，我们只需要使用这个类的一个或者多方法就可以了，那么这个方法就应该定义为静态方法

class FileUtil{
	// 从指定文件上把数据读出来打印在控制台或页面上的静态方法
  public static readFile(fileName: string){  
    fs.readFile(fileName, 'utf-8', (err: any, data: any) => {
        console.log("读文件成功 fs.readFile:", data?.toString());
    })
  }
  // 把键盘输入的数据或页面上获取的数据写入到指定文件上的静态方法
  public static writeFile(fileName:string){
    fs.writeFile(fileName, 'test-writeFile', function (error: any) {
      if (error) {
        console.log('写文件失败')
      } else {
        console.log('写文件成功')
      }
    })
  }
}
 // 实际应用中，读和写一般都不在一个时间段，可能读功能完成后，过了几分钟，用户才在客户端执行写的方法，
 // 又过了一会，用户又在客户端执行了读的方法。 但我们知道静态方法实际上是一直保存到内存空间，
 // 这样反复操作其实节省了大量反复创建 和释放 FileUtil 对象的时间和对应的对象内存空间。
FileUtil.readFile('./log.txt')
FileUtil.writeFile('./log.txt')

// 懒汉式/饿汉式单例模式
// 饿汉式单件设计模式是无论你是否用到了对象【实例】，一开始就建立这个唯一的对象。
class MyLocalStorage1 {
  // 第二步: 建立一个静态引用属性，同时把这个静态引用属性直接指向一个对象【 new MyLocalStorage()】
  // 第三步：外部调用第二步提供的静态方法来获取一个对象
  static localStorage: MyLocalStorage = new MyLocalStorage1()
  static count: number = 3
  // 第一步：把构造器设置为私有的，不允许外部来创建类的实例【对象】
  private constructor() {
    console.log("这是TS的单件设计模式的静态方法的构造器")
  }
  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem(key: string) {
    let value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : null
  }
}


// 懒汉式单件设计模式实现步骤
// 构建单件设计模式[懒汉式[等到需要使用对象时才创建对象,按需创建]单件设计模式 ]
class MyLocalStorage2 {
  // 静态属性和对象属性[实例属性】是类中两大成员
  static localStorage: MyLocalStorage//引用静态属性
  private constructor() {
    console.log("这是TS的单件设计模式的静态方法的构造器");
  }
  // 提供一个外部访问的方法,
  // 通过这个方法用来提供外部得到一个对象的方法
  //   1. 带static关键字的方法就是一个静态方法
  //   2. 静态方法和对象无关，外部的对象变量不能调用静态方法和静态属性，
  //   3. 外部可以通过类名来调用
  //   静态方法不可以访问实例属性或实例方法【对象属性或对象方法】
  public static getInstance() {
    if (!this.localStorage) {
      this.localStorage = new MyLocalStorage2()
    }

    return this.localStorage
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem(key: string) {
    let value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : null;

  }
}