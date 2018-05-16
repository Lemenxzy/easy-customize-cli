//分支字符串分割
function getCaption(str){
    let getarr = [];
    let index=str.indexOf('Remote branches:');
    str=str.substring(index,str.length);
    let arr = str.split('\n');
    for (let i=0; i<arr.length; i++){
        if (i && i !== arr.length-1){
            let str = (arr[i].trim().substring(0,arr[i].trim().indexOf('new'))).trim();
            if (str!== ''){
                getarr.push(str)
            }
        }
    }

    return getarr;
}

module.exports = getCaption;