/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class RegularPerson
  extends Skriptonus.BeingExistance
  {
    static get ALL(){
      RegularPerson.ALL=[];
      return RegularPerson.allExceptions;
    }
    static set ALL(item){
      if(
        !RegularPerson.hasOwnProperty("allExceptions")
      )RegularPerson.allExceptions=item;
    }
    constructor(...args){
      super(...args);
      RegularPerson.ALL.push(this);
    }
    /*
    destructor(){
      RegularPerson.ALL.splice(
        RegularPerson.ALL.indexOf(this),
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
