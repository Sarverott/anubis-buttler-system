const fs = require('fs');
const path = require('path');
const os = require('os');
const child_process = require('child_process');
const readline = require('readline');

var typeIndex=0, repeatLoop=true;

const rl = readline.createInterface({ input:process.stdin, output:process.stdin });

function firstMenu(){
  while(repeatLoop){
    var list=fs.readdirSync(path.join(__dirname, "project-inits"));
    console.log("# simplified CREATING NEW PROJECT :: select type of project");
    console.log(list.map((x, i) => `${i} --> ${path.basename(x, ".sh")}`));
    console.log("write 'X' or 'x' to EXIT program...")
    rl.question('==input==>', (index) => {
      if(!isNaN(parseInt(index))&&parseInt(index)>-1&&parseInt(index)<list.length){
        typeIndex=parseInt(index);
        secondMenu();
        repeatLoop=false;
      }else if(answer.toLowerCase()=="x"){
        repeatLoop=false;
      }else{
        console.warn(`!!!ERROR!!! there is no type with index "${answer}" `);
      }
    });
  }
}
function secondMenu(){

}

module.exports={
  firstMenu,
  secondMenu
}
