
var backspaceCompare = function(s, t) {
  if (s === t) return true
  return dealBack(s) === dealBack(t)
};

function dealBack(str) {
  return str.split('')
    .reduce((pre, cur) => {
      cur === '#' ? pre.pop() : pre.push(cur)
      return pre
    },[])
    .join('')
}

/**
 * 双指针
 * 碰到#，跳数累计+1, 当碰到不是#的时候回退
 */
function backspaceCompare(s, t) {
  let p = s.length - 1
  let q = t.length - 1
  let skipP = 0
  let skipQ = 0

  while(q >=0 || p >= 0) {
    while(s[p] === '#') {
      skipP++
      p--
    }

    while(t[q] === '#') {
      skipQ++
      q--
    }

    while(skipP && s[p] !== '#') {
      skipP--
      p--
    }
    while(skipQ && t[q] !== '#') {
      skipQ--
      q--
    }

    if (s[p] !== '#' && t[q] !== '#') {
      if (s[p] !== t[q]) {
        return false
      }
      p--
      q--
    }
  }

  return true
}