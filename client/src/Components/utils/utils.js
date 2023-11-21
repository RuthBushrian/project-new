export const validId = (value) => {
    if (value.length != 9)
        return false;
    let sum = 0;
    let ss = 0;
    let a = value.split("");
    let i = 0;
    for (i = 0; i < a.length - 1; i += 2) {
        sum += parseInt(a[i]);
    }
    for (i = 1; i < a.length - 1; i += 2) {
        ss = 2 * parseInt(a[i]);
        if (ss > 9) {
            ss = parseInt(ss / 10) + ss % 10;
        }
        sum += ss;
    }
    if (parseInt(a[a.length - 1]) != (10 - sum % 10))
        return false;
    return true;
}