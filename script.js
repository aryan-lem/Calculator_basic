let input = document.querySelector("#screen1");
let number=document.querySelectorAll(".num");
let operator=document.querySelectorAll(".op");
let result=document.querySelector("#equals");
let clear=document.querySelector(".clear");
let all_clear=document.querySelector(".all_clear");
let resultDisplayed=false;

//adding numbers functionalities
for(let i=0;i<number.length;i++){
  number[i].addEventListener("click",function(e){
    //text on screen and last char 
    let currentString=input.innerHTML;
    let lastChar=currentString[currentString.length-1];

    //if result is not displayed just keep continuing adding characters
    if(resultDisplayed===false){
      input.innerHTML+=e.target.innerHTML;
    }
    else if(resultDisplayed===true && lastChar==("+")||lastChar==("-")||lastChar==("x")||lastChar==("/")){
      //if some result has been displayed and user clicks an operator than we will add the operator
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    }else{
      //result is showing and user clicks a number or a point then we erase everything from the screen
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  })
}
//adding functionalities of operators buttons
for (let i=0;i<operator.length;i++){
  operator[i].addEventListener("click",function(e){
    //text on screen and last char 
    let currentString=input.innerHTML;
    let lastChar=currentString[currentString.length-1];
    //if last char is an operator then replace, simple!
    if(lastChar==("+")||lastChar==("-")||lastChar==("x")||lastChar==("/")){
      let newString=currentString.substring(0,currentString.length-1)+e.target.innerHTML;
      input.innerHTML=newString;
    }else if(currentString.length===0){
      alert("Enter a number first!");
    }else{
      //just normally add the operator pressed
      input.innerHTML+=e.target.innerHTML;
    }

  })
}
//now most important button equals,well we will also see clear and equals or just lets get that completed with
clear.addEventListener("click",function(){
  let currentString=input.innerHTML;
  let newString=currentString.substring(0,currentString.length-1);
  input.innerHTML=newString;
})
all_clear.addEventListener("click",function(){
  input.innerHTML="";
})
//alright now equal to button
result.addEventListener("click",function(){
  // this is the string that we will be processing eg. -10+26+33-56*34/23
  let inputString = input.innerHTML;
  let lastChar=inputString[inputString.length-1];
  //if last char is an operator then we cant perform any operation
  if(lastChar==("+")||lastChar==("-")||lastChar==("x")||lastChar==("/")){
    return;
  }
  if(inputString.indexOf("=")===-1){
    alert("Operate atleast two numbers!");
  }
  //now forming an array of numbers without operators
  let numbers=splitMulti(inputString,["+","-","x","/"]);
  //and array of operators without numbers
  let operators=splitMulti(inputString,["0","1","2","3","4","5","6","7","8","9","."]);
  //correcting our arrays
  for(let j=0;j<operators.length;j++){
    if(operators[j]===""){
      operators.splice(j,1);j--;
    }
  }
  for(let j=0;j<numbers.length;j++){
    if(numbers[j]===""){
      numbers.splice(j,1);j--;
    }
  }
  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");
  
  //now very simply we jump to indices and divide multiply add and subtract
  let divide = operators.indexOf("/");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("/");
  }

  var multiply = operators.indexOf("x");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("x");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }
  //finally we have our answer as numbers[0];
  input.innerHTML=numbers[0];
  resultDisplayed=true;
})
function splitMulti(str, tokens){
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  for(var i = 1; i < tokens.length; i++){
      str = str.split(tokens[i]).join(tempChar);
  }
  str = str.split(tempChar);
  return str;
}