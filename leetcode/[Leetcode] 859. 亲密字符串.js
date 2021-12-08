var buddyStrings = function(s, goal) {
    // 长度不相等肯定不是亲密关系
    if(s.length !== goal.length) {
        return false
    }

    // 字符串相等，有重复的肯定是亲密关系(交换重复元素 aab aab情况)
    // 没重复不是亲密关系(ab ab的情况)
    if (s === goal) {
        return hasRepeat(s)
    }

    // 剩下的开始找两个字符串不相等的
    let i = 0
    let j = 0

    // 找到第一个不相等的 abc bbc
    while(s[i] === goal[i]) ++i 

    j = i + 1
    while(j < s.length && s[j] === goal[j]) ++j // 找到第二个不相等的
    // 都走到length长度还找不到第二个不相等，说明只有一个字符串不相等就不是亲密关系(aaaax aaaab)
    if (j === s.length) return false
    // 如果这两个不相等的，不交叉相等，那也不是亲密关系 (abc abd)
    if (s[i] !== goal[j] || s[j] != goal[i]) return false;

    // 继续往下找看有没有不相等的，因为只能交换一次，所以不相等的 > 2肯定也不是亲密关系(abc, dae)
    j += 1
    while(j < s.length) {
        if (s[j] !== goal[j]) return false;
        j += 1
    }

    return true
};

function hasRepeat(str) {
    let obj = {}
    for(let i = 0; i < str.length; i++) {
        if (obj[str[i]]) {
            return true
        }
        obj[str[i]] = 1
    }
    return false
}