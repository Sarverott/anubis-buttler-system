/*
 * ANUBIS COMMANDING SYSTEM
 * anubis-atom-insertion.js
 * Sett Sarverott
 * late fall, 2019
 */
 /*
 communication anubis <--> atom
 local/network socket
 */
const fs=require("fs");
const path=require("path");
const os=require("os");
const net=require("net");
const child_process=require('child_process');
class AnubisAtomProjectGuard{
  static EDITOR(ATOM){
    //if(!AnubisAtomProjectGuard.hasOwnProperty("basicPackages"))AnubisAtomProjectGuard.basicPackages=[];
    //ATOM.appName
    //ATOM.appVersion
    //ATOM.history.projects
    //return
    //ATOM.packages.getAmpPath();
    //ATOM.packages.getAvailablePackageNames();
  }
  static ORDER(ATOM, [...order]){
    //
    var currentOrder=null;
    var pointerHook=ATOM;
    while(order.length!=0){
      if(
        order[0] instanceof String
        ||
        typeof order[0]=="number"
      ){
        if(currentOrder!=null)pointerHook=pointerHook[currentOrder];
        currentOrder=order[0];
      }else if(order[0] instanceof Array){
        pointerHook=pointerHook[currentOrder](...order[0]);
        currentOrder=null;
      }else{
        pointerHook=null;
        break;
      }
      order.shift();
    }
    if(currentOrder!=null&&pointerHook!=null)pointerHook=pointerHook[currentOrder];
    return pointerHook;
    //
    //

      //switch(order){
        //case "beep":
          //ATOM.beep();
      //  break;

      //}
      //TODO (https://flight-manual.atom.io/api/v1.57.0/AtomEnvironment/#instance-commands)
      //ATOM.setPosition()
    //
  }
  static INFORM(){
    //TODO (https://flight-manual.atom.io/api/v1.57.0/NotificationManager/)
  }
  static SCRIPTNAME(){
    var output="";
    for(var i=0;i<__filename.length;i++){
      if(__filename.charAt(i)=="\\"){
        output+="/";
      }else{
        output+=__filename.charAt(i);
      }
    }
    return output;
  }
  static SCRIPTDIR(){
    var output="";
    for(var i=0;i<__dirname.length;i++){
      if(__dirname.charAt(i)=="\\"){
        output+="/";
      }else{
        output+=__dirname.charAt(i);
      }
    }
    return output;
  }
  static INIT(){
    console.log("~~ ANUBIS COMMANDING SYSTEM:atom-insertion ~~");
    if(fs.existsSync(path.join(os.homedir(), ".atom"))){
      //init.coffee-insertion BEGIN
      if(!fs.existsSync(path.join(os.homedir(), ".atom", "init.coffee"))){
        fs.writeFileSync(
          path.join(
            os.homedir(),
            ".atom",
            "init.coffee"
          ),
          ""
        );
      }
      if(fs.readFileSync(
        path.join(
          os.homedir(),
          ".atom",
          "init.coffee"
        ),
        "utf8"
      ).split("\n").findIndex(function(line){
        return line=='(require "'+AnubisAtomProjectGuard.SCRIPTNAME()+'").CODEINSERT(atom) #ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION';
      })==-1){
        try {
          fs.appendFileSync(path.join(
              os.homedir(),
              ".atom",
              "init.coffee"
            ), '\n(require "'+AnubisAtomProjectGuard.SCRIPTNAME()+'").CODEINSERT(atom) #ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION\n');
          console.log('CODE INSERTED INTO init.coffee FILE');
        }catch(err){
          console.log("!!! ERROR !!!");
          console.log("COULD NOT INSERT CODE INTO init.coffee");
          console.log(err);
        }
      }else{
        console.log("init.coffee ALREDY PREPARED");
      }
      //init.coffee-insertion END
      //keymap.cson-insertion BEGIN
      if(!fs.existsSync(path.join(os.homedir(), ".atom", "keymap.cson"))){
        fs.writeFileSync(
          path.join(
            os.homedir(),
            ".atom",
            "keymap.cson"
          ),
          ""
        );
      }
      if(fs.readFileSync(
        path.join(
          os.homedir(),
          ".atom",
          "keymap.cson"
        ),
        "utf8"
      ).split("\n").findIndex(function(line){
        return line.includes('#ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION');
      })==-1){
        try {
          fs.appendFileSync(path.join(
              os.homedir(),
              ".atom",
              "keymap.cson"
            ), "\n'atom-workspace': #ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION\n  'alt-t':'custom:open-terminal' #ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION\n  'alt-i':'custom:init-git-and-npm-project' #ANUBIS-COMMANDING-SYSTEM-CODE-INSERTION\n");
          console.log('CODE INSERTED INTO keymap.cson FILE');
        }catch(err){
          console.log("!!! ERROR !!!");
          console.log("COULD NOT INSERT CODE INTO keymap.cson");
          console.log(err);
        }
      }else{
        console.log("keymap.cson ALREDY PREPARED");
      }
      //keymap.cson-insertion END
    }else{
      console.log("!!! ERROR !!!");
      console.log("ATOM EDITOR IS NOT INSTALLED :(");
    }
  }
  static CODEINSERT(ATOM){
    ATOM.workspace.observeTextEditors(function(editor){
      editor.onDidSave(function(){
        ATOM.beep();
        //const client = net.createConnection({
        //  path:path.join(__dirname, "..", "library", "atom-link.sock")
        //}, function(){
          // 'connect' listener.
        //  console.log('connected to server!');
        //  client.write('world!\r\n');
        //});
        //client.on('error', function(error){
        //  console.log(error.toString());
        //  ATOM.beep();
        //  client.end();
        //});
        //client.on('data', function(data){
        //  console.log(data.toString());
        //  client.end();
        //});
        //client.on('end', function(){
        //  console.log('disconnected from server');
        //});
      });
    });
    ATOM.commands.add('atom-workspace', 'custom:open-terminal', function(){
      for(var i in ATOM.project.getPaths()){
        switch(os.platform()){
          case "win32":
            //child_process.exec('start cmd.exe /K '+path.parse(ATOM.project.getPaths()[i]).root.substring(0,2)+' cd "'+ATOM.project.getPaths()[i]+'"');
            child_process.exec('start cmd.exe /T:04 /K echo ### ANUBIS-COMMANDING-SYSTEM ###', {cwd:ATOM.project.getPaths()[i]});
          break;
          default:
            alert("!!! ERROR !!!\nnon-supported platform ("+os.platform()+")")
        }
      }
    });
    ATOM.commands.add('atom-workspace', 'custom:init-git-and-npm-project', function(){
      for(var i in ATOM.project.getPaths()){
        switch(os.platform()){
          case "win32":
            child_process.exec('cd "'+ATOM.project.getPaths()[i]+'" && git init && npm init');
          break;
          default:
            alert("!!! ERROR !!!\nnon-supported platform ("+os.platform()+")")
        }
      }
    });
  }
}
if(require.main===module){
  if(process.argv.length==2){
    //
  }else if(process.argv.length==3){
    //
  }else{
    //
  }
  AnubisAtomProjectGuard.INIT();


  
}else{
  module.exports=AnubisAtomProjectGuard;
}
