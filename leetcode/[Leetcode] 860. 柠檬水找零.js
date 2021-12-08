function lemonadeChange(bills) {
  let five = 0
  let ten = 0
  let i = 0
  while (i < bills.length) {
    switch(bills[i]) {
      case 5:
        five++
      break
      case 10:
        if (five) {
          five--
          ten++
        } else {
          return false
        }
      break;
      case 20:
        if (five && ten) {
          five--
          ten--
        } else if (five >= 3) {
          five -= 3
        } else {
          return false
        }
    }
    i++
  }

  return true
}