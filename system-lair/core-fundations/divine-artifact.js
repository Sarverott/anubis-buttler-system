/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class DivineArtifact
  extends Skriptonus.FundamentalInformation{
    constructor(...args){
      super(...args);
      //this.name=Skriptonus.executeBaptism;
      //this.brights=new Skriptonus.LuminocityMatter();
      //this.darks=new Skriptonus.ObscurityMatter();
    }
    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}
