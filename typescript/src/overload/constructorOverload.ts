// =================================
// 构造器重载
// =================================
// 构造器重载的意义，创建实例的时候，例如求面积类，正方形等简单的只需传两个值，但复杂的例如五角星就传对象比较合适
console.log('构造器重载 ==================== start')
type ChartParamsType = {
  width?: number
  height?: number
  radius?: number

}

class Square {
  public width!: number
  public height!: number

  constructor(width: number, height: number)
  constructor(params: ChartParamsType)
  constructor(params: any, height: number = 0) {
    if (typeof params === 'object') {
      this.width = params.width
      this.height = params.height
    } else {
      this.width = params
      this.height = height
    }
  }

  public getArea(): number {
    return this.width * this.height
  }
}
let square = new Square(30, 40)
console.log(square.getArea())
let chartParams: ChartParamsType = { width: 30, height: 40 }
let square2 = new Square(chartParams)
console.log(square2.getArea())

console.log('构造器重载 ==================== end')
