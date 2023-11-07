/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class DemonicEntity
  extends Skriptonus.BeingExistance{
    static get ALL(){
      DemonicEntity.ALL=[];
      return DemonicEntity.allExceptions;
    }
    static set ALL(item){
      if(
        !DemonicEntity.hasOwnProperty("allExceptions")
      )DemonicEntity.allExceptions=item;
    }
    constructor(...args){
      super(...args);
      DemonicEntity.ALL.push(this);
    }
    /*
    destructor(){
      DemonicEntity.ALL.splice(
        DemonicEntity.ALL.indexOf(this),
        1
      );
    }
    */
    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}
