var frequencySort = function(s) {
  let mapKey = s.split('').reduce((pre, a) => {
    if (!pre[a]) pre[a] = 0
    pre[a] += 1
    return pre
  },{})

  return Object.keys(mapKey)
    .sort((a, b) => mapKey[b] - mapKey[a])
    .reduce((pre, a) => pre + a.repeat(mapKey[a]), '')
}