// =================================
// 原型继承
// =================================
console.log('原型继承 ==================== start')

// 手写优化后源码：
var _extends = (this.extends_) || (function () {
  function getExendsStatics2 (son, parent) {
    son.__proto__ = parent
  }
  function getExendsStatics3 (son, parent) {
    for (let key in parent) {
      if (Object.prototype.hasOwnProperty.call(parent, key)) {
        son[key] = parent[key]
      }
    }
    // 等价
    //继承父类的静态属性和方法
    // Object.keys(parent).forEach(function (son) {
    //   Child[key] = Father[key]
    // })
    //return Object.setPrototypeOf(son, parent)
  }
  var extendsStatics = function (son, parent) {

    extendsStatics = Object.setPrototypeOf || getExendsStatics2 || getExendsStatics3
    return extendsStatics(son, parent)

  }
  var _extends = function (son, parent) {
    extendsStatics(son, parent)
    function middle () {
      this.constructor = son
    }
    if (parent) {
      middle.prototype = parent.prototype
      //son.prototype = parent === null ? Object.create(null) : new middle()
      son.prototype = new Middle()
    } else {
      son.prototype = Object.create(null)
    }
  }
  return _extends
})()

var Vechile = (function () {
  function Vechile (brand_, vechileNo_, days_, deposit_) {
    this.brand = brand_
    this.vechileNo = vechileNo_
    this.days = days_
    this.deposit = deposit_
  }
  // 计算租赁车的价格 ( calculateRent)
  Vechile.prototype.calculateRent = function () {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand)
    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租")
    return 0
  }
  Vechile.prototype.safeShow = function () {
    console.log("车规则....")
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:")
  }
  Vechile.count = 300
  return Vechile
}())


var Car = (function (_super) {
  _extends(Car, _super)
  function Car (brand_, vechileNo_, days_, deposit_, type_) {
    _super.call(this, brand_, vechileNo_, days_, deposit_)
    // var _this = _super.call(this, brand_, vechileNo_, days_, deposit_) || this
    this.type = type_
    //console.log("_this:", _this)
    //_this.type = type_
    //return _this
    return this
  }
  Car.prototype.getPriceByType = function () {
    var rentMoneyByDay = 0 //每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800
    }
    else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400
    }
    else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200
    }
    return rentMoneyByDay
  }
  Car.prototype.calculateRent = function () {
    this.safeShow()
    _super.prototype.calculateRent.call(this) //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count)
    console.log("型号:", this.type)
    return this.days * this.getPriceByType()
  }
  return Car
}(Vechile))

var car = new Car("普拉多", "京3A556", 3, 100000, "凯美瑞旗舰版")
console.log("car:", car)
console.log(car.calculateRent())

console.log('原型继承 ==================== end')