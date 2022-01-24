// =================================
// 单例模式
// 知识点: 静态属性/静态方法/懒汉式/饿汉式
// =================================

// 设计模式其实就是更好的编写代码方案
// 从北京到深圳有很多出行方案，把出行看作编码，如果想节约时间，坐飞机就是当前最好的方式
// 什么是单例模式?
// 一个类对外有且只有一个实例(只提供一个实例)，这种模式就是单例模式
// 单例模式应用场景
// Vuex, react-redux中的store，localStorage，日志等
import MyLocalStorage from "./MyLocalStorage";

let myLocalStorage = MyLocalStorage.getInstance()

const obj = {username: 'test', age: 20}
myLocalStorage.setItem('loginUser', obj)

console.log(myLocalStorage.getItem('loginUser'))