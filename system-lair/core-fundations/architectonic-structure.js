/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class ArchitectonicStructure
  extends Skriptonus.DivineArtifact
  {
    static get ALL(){
      ArchitectonicStructure.ALL=[];
      return ArchitectonicStructure.allExceptions;
    }
    static set ALL(item){
      if(
        !ArchitectonicStructure.hasOwnProperty("allExceptions")
      )ArchitectonicStructure.allExceptions=item;
    }
    constructor(...args){
      super(...args);
      ArchitectonicStructure.ALL.push(this);
    }
    /*
    destructor(){
      ArchitectonicStructure.ALL.splice(
        ArchitectonicStructure.ALL.indexOf(this),
        1
      );
    }
    */
    setupUnion(union){
      this.union=union;
    }
    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}
