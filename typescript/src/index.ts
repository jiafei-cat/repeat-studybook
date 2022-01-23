import './methodOverload'
class Order {
	public orderId:number = 0
  public date:Date = new Date()
  public customerName:string = 'no name'
  public phone:string = '123'

  // public orderDetail:orderDetail[] = []
  public orderDetail:Array<OrderDetail> = []
  
  constructor(orderId:number, date:Date, customerName:string, phone:string, orderDetail: Array<OrderDetail>) {
    this.orderId = orderId
    this.date = date
    this.customerName = customerName
    this.phone = phone
    this.orderDetail = orderDetail
  }
  // 也可以这样写, 这样就不需要上面的声明了
  // constructor(public orderId:number, public date:Date, public customerName:string, public phone:string) {
  // 	this.orderId = orderId
  //   this.date = date
  //   this.customerName = customerName
  //   this.phone = phone
  // }
}

class OrderDetail {
	// public orderDetailId:number = 0
  // public productName:string = ''
  // public price:number = 0
  // public count:number = 0
  // public orderDetailId:number
  // public productName:string
  // public price:number
  // public count:number

  constructor(public orderDetailId:number, public productName:string, public price:number, public count:number) {
    // this.orderDetailId = orderDetailId
    // this.productName = productName
    // this.price = price
    // this.count = count
  }
}

const orderDetailItem_1 = new OrderDetail(1, '肥皂', 999, 1)
const orderDetailItem_2 = new OrderDetail(2, '香蕉', 999, 1)

const orderItem = new Order(1, new Date(), '周杰伦', '1311111111', [orderDetailItem_1, orderDetailItem_2])
// console.log(orderItem)

class OrderDetail1 {
	public count!:number
	public price!:number
	public countPrice():number {
    // 这里报错，因为count/price可能为undefined
  	return this.count * this.price
  }
	constructor(count:number, price:number) {
  	this.count = count
  	this.price = price
  }
}

const b = new OrderDetail1(1, 2)
// console.log(b.countPrice())
export {}