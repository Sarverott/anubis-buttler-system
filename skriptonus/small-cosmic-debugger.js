var PATIENT=null;

function colors(zloc=null, color=null){
  if(zloc&&color){
    const loc={
      front:3,foreground:3,
      back:4,background:4
    };
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
  }else return "\x1b[0m";
}
function debugHeader(){
  return colors("front", "red")
    +" <~ "
    +colors("back", "white")
    +colors("front", "red")
    +PATIENT.name.toUpperCase()
    +colors("front", "red")
    +colors("back", "black")
    +" ~> "
    +colors();
}
function debugLabel(label, labelColor){
  return colors("back", labelColor)
    +colors("front", "black")
    +label.toUpperCase()
    +colors();
}
function printBeggining(){
  console.time(debugHeader());
  console.log(
    debugHeader(),
    `PROGRAM STARTS in ${Date.now()} second of UNIXUS era`
  );
}
function printEnding(){
  //console.time('skriptonus-debug-timer');
  console.timeEnd(debugHeader());
  console.log(
    `PROGRAM STOPS in ${Date.now()} second of UNIXUS era`
  );
}
function printLog(...message){
  console.timeLog(
    debugHeader(),
    debugLabel("info", "green"), " :;$ ", ...message
  );
}
function printAlert(...message){
  console.timeLog(
    debugHeader(),
    debugLabel("alert", "yellow"), " :;$ ", ...message
  );
}
function printTimerOn(label){
  console.time(label);
  console.timeLog(
    debugHeader(),
    debugLabel("timein", "blue"), `timer for "${label}" is on the run...`
  );
}
function printTimerOff(label){
  console.timeLog(
    debugHeader(),
    debugLabel("timeout", "blue"), `timer "${label}" halted!`
  );
  console.timeEnd(label);
}
function printError(...message){
  console.timeLog(
    debugHeader(),
    "\a",
    debugLabel("issue", "red"),
    "sended from debugged part"
  );
  console.trace("received issue:", ...message);
  throw "DEBUG_ISSUE_EXITS_THREAD";
}

module.exports={
  debug(status, ...message){
    if(PATIENT==null)PATIENT=this;
    switch (status){
      case "BEG":printBeggining();break;
      case "END":printEnding();break;
      case "log":printLog(...message);break;
      case "ring":printAlert(...message);break;
      case "timer-on":printTimerOn(message[0]);break;
      case "timer-off":printTimerOff(message[0]);break;
      case "error":printError(...message);break;
      default:
        console.trace("received data:", status, ...message);
        throw "UNREGISTRED_DEBUG_STATUS"
    }
  }
};
