/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class AbsolutFormula
  extends Skriptonus.DivineArtifact
  {
    constructor(...args){
      super(...args);
      //console.log(Skriptonus);
      this.ALL={
        people:Skriptonus.RegularPerson.ALL,
        buildings:Skriptonus.ArchitectonicStructure.ALL,
        gods:Skriptonus.DemonicEntity.ALL,
        chronologics:Skriptonus.FatumContinuum.ALL,
        networks:Skriptonus.LiaisonStigma.ALL
      }
    }

    get value(){
      return this.data;
    }
    set value(indata){
      this.data=indata;
    }
  };
}
