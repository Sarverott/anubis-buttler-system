/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/

var HOSTNAME="setternet-C1";

const SE=require("./static-extender.js");

const EventEmitter = require('events');
const fs=require("fs");
const path=require("path");
var BOS=null;//just another shorter alias



class BlacksmithOrganizationSystem{
  constructor(...args){
    this.id=BOS.REGIST(...(
      (BOS.MODE=="insert")
      ?
      [this, args.shift()]
      :
      [this]
    ));
    this.emitter=new EventEmitter();
    this.beforeConstruct(...args);
    this.setup(...args);
    this.afterConstruct(...args);
  }
  setup(){}
  beforeConstruct(){}
  afterConstruct(){}

  /*
  getRaport(){
    return {
      id:this.id
    };
  }
  */

  static get Workshop(){return require("./workshop/workshop.js");}
  static get Throwbox(){return require("./throwbox/throwbox.js");}
  static get Forge(){return require("./forge/forge.js");}
  static get Project(){return require("./project/project.js");}
  static get Sarcophag(){return require("./sarcophag/sarcophag.js");}
  static get Sheme(){return require("./sheme/sheme.js");}
  static get Archive(){return require("./archive/archive.js");}
  static get Subject(){return require("./subject.js");}
  static get Superproject(){return require("./superproject/superproject.js");}


  static SAFE_INIT(){
    if(typeof BOS.allIDs==='undefined')BOS.allIDs={};
    if(typeof BOS.counters==='undefined')BOS.counters={};
  }
  static get ALL(){
    BOS.SAFE_INIT();
    return BOS.allIDs;
  }
  static GET_ID(id){
    return BOS.ALL[id];
  }
  static GET_IDS(...id){
    var output=[];
    for(var i in id){
      output.push(BOS.GET_ID(id[i]));
    }
    return output;
  }
  static LIST_ID(){
    return Object.keys(BOS.ALL);
  }
  static SET_APPEND_MODE(){
    BOS.idAddressingMode="append";
  }
  static SET_INSERT_MODE(){
    BOS.idAddressingMode="insert";
  }
  static get MODE(){
    if(typeof BOS.idAddressingMode==='undefined')BOS.SET_APPEND_MODE();
    return BOS.idAddressingMode;
  }
  static REGIST(item, id=null){
    BOS.SAFE_INIT();
    var objectType=item.constructor.name.substring(10).toLowerCase();
    var tmpId=id;
    if(BOS.MODE=="append"){
      if(BOS.counters.hasOwnProperty(objectType))++BOS.counters[objectType];
      else BOS.counters[objectType]=0;
      tmpId=`${HOSTNAME}-${objectType}-${BOS.counters[objectType]}`;
    }else if(BOS.MODE=="insert"){
      var idData=id.split("-");
      if(BOS.counters.hasOwnProperty(idData[2])){
        if(parseInt(idData[3])>BOS.counters[idData[2]])
          BOS.counters[idData[2]]=parseInt(idData[3]);
      }else{
        BOS.counters[objectType]=parseInt(idData[3]);
      }
    }
    BOS.allIDs[tmpId]=item;
    return tmpId;
  }
  static SAVE_DIRTREE(dirpath, readable=false){
    var output=BOS.SAVE();
    output.savemode="dirtree";
    SE.SAFE_CREATE_DIR(dirpath);
    for(var i in output.items){
      SE.SAFE_CREATE_DIR(path.join(dirpath, i));
      SE.WRITE_OUTPUT_FILE(
        path.join(dirpath, i, "_item-data.bos.json"),
        output.items[i],
        readable
      );
    }
    output.items=Object.keys(output.items);
    SE.WRITE_OUTPUT_FILE(
      path.join(dirpath, "_general-record.bos.json"),
      output,
      readable
    );
  }
  static SAVE_DIR(dirpath, readable=false){
    var output=BOS.SAVE();
    output.savemode="onedir";
    SE.SAFE_CREATE_DIR(dirpath);
    for(var i in output.items){
      SE.WRITE_OUTPUT_FILE(
        path.join(dirpath, i+".bos.json"),
        output.items[i],
        readable
      );
    }
    output.items=Object.keys(output.items);
    SE.WRITE_OUTPUT_FILE(
      path.join(dirpath, "_general-record.bos.json"),
      output,
      readable
    );
  }
  static SAVE_FILE(filepath, readable=false){
    var output=BOS.SAVE();
    output.savemode="onefile";
    SE.WRITE_OUTPUT_FILE(
      path.join(filepath),
      output,
      readable
    );
  }
  static SAVE(){
    BOS.SAFE_INIT();
    var output={
      savemode:"none",
      items:{},
      counters:BOS.counters,
      hostname:HOSTNAME,
      enviroment:null
    };
    for(var i in BOS.allIDs){
      output.items[i]=BOS.writeRaport(BOS.allIDs[i]);
    }
    return output;
  }
  static LOAD_FILE(filepath){
    return BOS.LOAD(SE.READ_INPUT_FILE(filepath));
  }
  static LOAD_DIR(dirpath){
    return BOS.LOAD(
      SE.READ_INPUT_FILE(
        path.join(
          dirpath,
          "_general-record.bos.json"
        )
      ),
      dirpath
    );
  }
  static get TYPE_HIERARHY(){
    return {
      project:BOS.Project,
      sheme:BOS.Sheme,
      throwbox:BOS.Throwbox,
      sarcophag:BOS.Sarcophag,
      superproject:BOS.Superproject,
      archive:BOS.Archive,
      forge:BOS.Forge,
      workshop:BOS.Workshop
    }
  }
  static LOAD(input, dirpath=null){
    HOSTNAME=input.hostname;
    BOS.SET_INSERT_MODE();
    var outWorkshop=[];
    switch(input.savemode){
      case "onefile":
        for(var i in BOS.TYPE_HIERARHY){
          for(var j in input.items){
            var tmpWorkshop=null;
            if(j.includes(i)){
              tmpWorkshop=BOS.TYPE_HIERARHY[i].READ(j, input.items[j]);
            }
            if(tmpWorkshop)outWorkshop.push(tmpWorkshop);
          }
        }
      break;
      case "onedir":
        for(var i in BOS.TYPE_HIERARHY){
          for(var j in input.items){
            var tmpWorkshop=null;
            if(j.includes(i)){
              tmpWorkshop=BOS.TYPE_HIERARHY[i].READ(
                j,
                SE.READ_INPUT_FILE(path.join(dirpath, j+".bos.json"))
              );
            }
            if(tmpWorkshop)outWorkshop.push(tmpWorkshop);
          }
        }
      break;
      case "dirtree":
        for(var i in BOS.TYPE_HIERARHY){
          for(var j in input.items){
            var tmpWorkshop=null;
            if(j.includes(i)){
              tmpWorkshop=BOS.TYPE_HIERARHY[i].READ(
                j,
                SE.READ_INPUT_FILE(path.join(dirpath, j, "_item-data.bos.json"))
              );
            }
            if(tmpWorkshop)outWorkshop.push(tmpWorkshop);
          }
        }
      break;
    }
    BOS.SET_APPEND_MODE();
    return outWorkshop;
  }
  static SET_RAPORT(itemClass,raportingObject){
    for(var i in raportingObject){
      itemClass[i]=raportingObject[i];
    }
  }
  //static readRaport(id, data){
  //  var type=id.split("-");
  //  var type
  //}
  static writeRaport(bosItem){
    var x=[
      BOS.Project,
      BOS.Sheme,
      BOS.Throwbox,
      BOS.Sarcophag,
      BOS.Superproject,
      BOS.Archive,
      BOS.Forge,
      BOS.Workshop
    ]
    for(var i in x){
      //console.log(typeof bosItem, "  ", typeof x[i]);
      if(bosItem instanceof x[i]){
        return x[i].WRITE(bosItem);
      }
    }
    console.error(bosItem);
    return null;
  }
};

BOS=BlacksmithOrganizationSystem;

module.exports={
  BOS,
  SE
  //HOSTNAME
};
