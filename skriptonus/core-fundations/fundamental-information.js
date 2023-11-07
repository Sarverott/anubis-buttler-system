/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class FundamentalInformation
  extends Skriptonus
  {
    constructor(...args){

      super(...args);
      //console.log(Skriptonus);

      //this.name=Skriptonus.executeBaptism;
      //this.fatum=null;
      //console.log(this.name)
      //this.data=null;
      //this.setupFoundation(...args);
    }
    loadSigil(type, data){
      switch(type){
        case "branch":

        break;
        case "node":

        break;
      }
    }
    destructor(...args){
      Skriptonus.throwExcommunication=this.name;
    }
    //unitUnitaryEventEmitter(){

    //}
    //destructor(){}
    //setupFoundation(){}
    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}


//class FundamentalInformation
//module.exports=FundamentalInformation;
