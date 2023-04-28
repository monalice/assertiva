
function stripNonNumeric(str) {
    str = str.replace(/[^\d]+/g,'');
    return str;
}


export { stripNonNumeric }