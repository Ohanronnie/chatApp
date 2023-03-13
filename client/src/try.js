export default function tr(...val){
let arr = [...val];

let iterator;
let newArr = [];
arr.forEach((e,f) => {
  if(iterator){
    if(iterator === e){
      newArr[newArr.length - 1].push(e);
      iterator = e;
    }
    else {
      newArr.push([e]);
      iterator = e;
    }
  }
  else if(!iterator){
    newArr.push([e]);
    iterator = e;
  }
});
return newArr
}
console.log(tr(1,2,3,4,4,5,5,6,5,7))
