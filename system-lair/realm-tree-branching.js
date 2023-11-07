const fs=require("fs");
const path = require('path');

module.exports={
  readSpellingType(itemname, dirPath){
    var jsonLoad=this.JSONs.load(path.join(dirPath, itemname));
    var testLoad=[
      path.extname(itemname)==".json",
      itemname.split(".")[0]=="sigil",
      itemname.substring(itemname.indexOf("."))==".spout.json",
      itemname.length==5+4+4,
      //(jsonLoad)?jsonLoad.hasOwnProperty("sigil"):false,
      //(jsonLoad&&jsonLoad.hasOwnProperty("sigil"))?this.sigilsToSpellsList.hasOwnProperty(jsonLoad.sigil):false,
    ]
    if(
      itemname.split(".")[0]=="sigil"
      &&
      path.extname(itemname)==".json"
      &&
      itemname.length==5+4+4
      &&
      jsonLoad
    )return "sigil-booked";
    else if(
      path.extname(itemname)==".json"
      &&
      jsonLoad
      &&
      jsonLoad.hasOwnProperty("sigil")
      &&
      this.sigilsToSpellsList.hasOwnProperty(jsonLoad.sigil)
    )return "sigil-paged";
    else if(
      itemname.substring(itemname.indexOf("."))==".spout.json"
      &&
      itemname.split(".").length==3
      &&
      jsonLoad
      &&
      jsonLoad.hasOwnProperty("relocator")
      &&
      jsonLoad.hasOwnProperty("destination")
    )return "spouted-volume";
    else return "nonspellable-file"
  },
  exploreRealmBranch(currentPath){
    this.debug("log", `exploring branch at "${currentPath}"...`);
    var branchContent=fs.readdirSync(currentPath, {withFileTypes:true});
    var currentBranch=null;
    var currentNodes=[];
    var recurentBranchPaths=[];
    var localDirList=[];
    var spoutsSignsList=[];
    for(var item of branchContent){
      if(item.isFile()){
        //this.debug("log", `checking file ${item.name}...`);
        //if(
          //this.JSONs.ext(item.name)
          //&&
          //this.JSONs.load(path.join(currentPath, item.name))
        //){
          var spellType=this.readSpellingType(item.name, currentPath);
          console.log([
            item.name,
            spellType
          ]);
          if(spellType=="sigil-booked"){
            this.debug("log", `sigil file (${item.name}) was found!`);
            currentBranch={
              spell:this.sigilsToSpellsList[item.name.split(".")[1]],
              enchantments:this.JSONs.load(path.join(currentPath, item.name))
            };
            currentBranch.instance=new this[currentBranch.spell](currentBranch.enchantments, currentPath);
          }else if(spellType=="sigil-paged"){
            this.debug("log", `divine artifact defining file (${item.name}) was found!`);
            var tmpLoadJson=this.JSONs.load(path.join(currentPath, item.name));
            currentNodes.push({
              family:item.name.split(".")[0],
              localId:item.name.split(".")[1],
              enchantments:tmpLoadJson,
              spell:this.sigilsToSpellsList[tmpLoadJson.sigil],
              instance:new this[this.sigilsToSpellsList[tmpLoadJson.sigil]](tmpLoadJson, currentPath)
            });
          }else if(spellType=="spouted-volume"){
            this.debug("log", `spouting bound file (${item.name}) was found!`);
            spoutsSignsList.push({
              spouted:item.name.split(".")[0],
              details:this.JSONs.load(path.join(currentPath, item.name))
            });
          }
        //}
      }else if(item.isDirectory()){
        if(!this.ignoredInRealmTree.includes(item.name)){
          this.debug("log", `directory (${item.name}) added to check inheritance later...`);
          localDirList.push(path.join(currentPath, item.name));
        }else{
          this.debug("ring", `directory "${item.name}" excluded from realm, skipping...`);
        }
      }
    }
    return {
      upon:currentPath,
      summon:currentBranch,
      with:currentNodes,
      annexing:spoutsSignsList,
      inherit:localDirList
    };
  },
  buildSkeletonTree(){
    this.debug("ring", `ygdrasilion skeleton growing...`);
    this.ygdrasilion.rootSheme=this.exploreRealmBranch(this.singularityPath);
    //this.ygdrasilionBranchesShematics=[];
    var tmpWorkQueue=[this.ygdrasilion.rootSheme];
    while(tmpWorkQueue.length){
      var tmpContextPath=tmpWorkQueue[0].inherit.find(
        (child)=>typeof(child)!="object"
      );
      if(typeof(tmpContextPath)!="undefined"){
        var tmpContextItem=this.exploreRealmBranch(tmpContextPath);
        tmpWorkQueue[0].inherit[
          tmpWorkQueue[0].inherit.indexOf(tmpContextPath)
        ]=tmpContextItem;
        tmpWorkQueue.unshift(tmpContextItem);
      }else this.ygdrasilion.branchShematics.push(tmpWorkQueue.shift());
    }
  }
  /*set throwExcommunication(name){
    if(Skriptonus.nameChronicle.includes(name)){
      Skriptonus.nameChronicle.splice(
        Skriptonus.nameChronicle.indexOf(name), 1
      );
    }
    //Skriptonus.universe.emit("skriptonus-orders", name, "to vanish from existence");
  },
  set executeBaptism(customName){

  },
  get executeBaptism(){
    var tmpname="";
    while(tmpname==""||Skriptonus.nameChronicle.includes(tmpname)){
      tmpname=""
      var tmpnamelength=Math.random()*Skriptonus.namelength;
      for(var i=0;i<tmpnamelength;i++){
        tmpname+=Skriptonus.namebase.split("-")[
          Math.floor(
            Math.random()*Skriptonus.namebase.split("-").length
          )
        ]
      }
    }
    Skriptonus.nameChronicle.push(tmpname);
    return tmpname;
  }*/
};
