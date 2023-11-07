/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class BeingExistance
  extends Skriptonus.FundamentalInformation
  {
    constructor(...args){
      super(...args);
      //this.name=Skriptonus.executeBaptism;
    }
    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}
