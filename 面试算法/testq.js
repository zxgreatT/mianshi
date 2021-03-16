const str = 'abccddda'
function fnstr(str) {
    let newstr = ''
    const length = str.length
    for(let i = 0;i<length;i++) {
        if(str[i] === str[i+1]) {
            i++
        }
        if(str[i] != str[i+1]) {
            newstr += str[i]
            continue
        }
        if(str[i] != str[i-1] && i >= 1) {
            newstr += str[i]
        }
    }
    return newstr
}
console.log(fnstr(str))