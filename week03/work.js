// const number16 = {
//   A:10,
//   B:11,
//   C:12,
//   D:13,
//   E:14,
//   F:15
// }
const number16 = ['A','B','C','D','E','F'];
const number10 = ['0','1','2','3','4','5','6','7','8','9'];

function stringToNumber(string,base){
  let pre = 10;
  if(base){
    pre = base;
  }else{
    let mark = string.slice(0,2);
    if(mark==='0x'){
      pre = 16;
    }else if(mark.slice(0,1)==='0'){
      pre = 8;
    }else{
      pre = 10;
    }
  }
  let res = 0;
  if(pre===16){
    let numberString = (string.slice(0,2)==='0x')|| (string.slice(0,2)==='0X')?string.slice(2) : string;
    let arr = numberString.split('').reverse();
    arr.forEach((item,index)=>{
      let thisIndexOf10 = number10.indexOf(item);
      if(thisIndexOf10>-1){
        res += thisIndexOf10*Math.pow(16,index);
      }else{
        res += (number16.indexOf(item.toUpperCase())+10)*Math.pow(16,index);
      }
    });
    return res;
  }else if(pre===10){
    let arr = string.split('').reverse();
    arr.forEach((item,index)=>{
      res+=number10.indexOf(item)*Math.pow(10,index);
    });
    return res;
  }else if(pre===8){
    let numberString = string.slice(0,1)==='0'?string.slice(1) : string;
    let arr = numberString.split('').reverse();
    arr.forEach((item,index)=>{
      let thisIndexOf10 = number10.indexOf(item);
      res += thisIndexOf10*Math.pow(8,index);
    });
    return res;
  }else if(pre===2){
    let arr = string.split('').reverse();
    arr.forEach((item,index)=>{
      res+=number10.indexOf(item)*Math.pow(2,index);
    });
    return res;
  }
}

function numberToString(number,base){
  let numberString = '';
  let num = number;
  if(base===2){
    while (num>0) {
      numberString=num%2+numberString;
      num = Math.floor(num/2);
    }
    return numberString;
  }else if(base===8){
    while (num>0) {
      numberString=num%8+numberString;
      num = Math.floor(num/8);
    }
    return numberString;
  }else if(base===10){
    return num+'';
  }else if(base===16){
    while (num>0) {
      let token =0;
      if(num%16<10){
        token = num%16;
      }else{
        token = number16[num%16-10];
      }
      numberString=token+numberString;
      num = Math.floor(num/16);
    }
    return numberString;
  }
}

let test = '11011010'
console.log(stringToNumber(test,16));
console.log(parseInt(test,16));
let test2 = 12182218;
console.log(numberToString(test2,16));
console.log(test2.toString(16));
