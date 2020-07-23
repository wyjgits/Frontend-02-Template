function match(string){
  let state = start;
  for(let c of string){
    state = state(c);
  }
  return state===end;
}
function start(c){
  if(c==='a'){
    return foundA;
  }
  return start;
}
function foundA(c){
  if(c==='b'){
    return foundB;
  }
  return start(c) ;
}
function foundB(c){
  if(c==='a'){
    return foundA2;
  }
  return start(c);
}
function foundA2(c){
  if(c==='b'){
    return foundB2;
  }
  return foundA(c);
}
function foundB2(c){
  if(c==='a'){
    return foundA3;
  }
  return foundB(c);
}
function foundA3(c){
  if(c==='b'){
    return foundB3;
  }
  return foundA2(c);
}
function foundB3(c){
  if(c==='x'){
    return end;
  }
  return foundB2(c);
}
function end(){
  return end;
}
console.log(match('aabababx'));