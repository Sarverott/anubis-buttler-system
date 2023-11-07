const Skriptonus=require('./skriptonus');
const repl=require("repl");
const fs = require('fs');

function getColor(zloc, color){
  const loc={
    front:3,foreground:3,
    back:4,background:4
  }
  const col={
    '#000':0,black:0,
    '#f00':1,red:1,
    '#0f0':2,green:2,
    '#00f':4,blue:4,
    '#ff0':3,yellow:3,
    '#f0f':5,magenta:5,
    '#0ff':6,cyan:6,
    '#fff':7,white:7
  };
  return `\x1b[${loc[zloc]}${col[color]}m`;
}
function resetColor(){
  return "\x1b[0m";
}

if(require.main===module){
  //console.log(listElementalCapableElements("skriptonus.js", "seed-of-skriptonus.js", "fatum-consequencion.js"));
  Skriptonus.plantBearing("./seed-of-skriptonus.json");
  Skriptonus.enchantNature();
  Skriptonus.theBigBang();
  const promptConfig={
    prompt:(
      //getColor('back', 'red')+
      getColor('front', 'red')+
      '#~makers_enchantment_book~> '+
      resetColor()
    )
  };
  const prompt=new repl.REPLServer(promptConfig);
  Object.assign(prompt.context, {
    SKRIPTONUS:Skriptonus,
    UNIVERSE:Skriptonus.universe,
    SCRIBES:Skriptonus.nameChronicle,
    PROMPT:promptConfig
    //PEOPLE:Skriptonus.universe.
  });
  Object.defineProperty(prompt.context, "help", {
    get(){
      console.log();
      console.log(
        getColor("back", "red")+getColor("front", "white")+"Skriptonus"+resetColor()+'\r\n',
        ...Object.keys(prompt.context).map((item)=>item+'\n')
      );
      return 'for more help use ".help" or check manuals'
    }
  });
  Object.defineProperty(prompt.context, "bye", {
    get(){
      process.kill(process.pid);
      return 'BYE'
    }
  });
  //console.log(repl.setupHistory)
  //prompt.context.help;
  prompt.setupHistory("./logs/repl-history.txt", function(){})
  /*
  if(fs.existsSync('./logs/repl-history.json')){

  }else{

  }
  */
}else{
  module.exports=Skriptonus;
}
