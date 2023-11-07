/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
module.exports=function(Skriptonus){
  return class LiaisonStigma
  extends Skriptonus.FundamentalInformation
  {
    static get ALL(){
      LiaisonStigma.ALL=[];
      return LiaisonStigma.allExceptions;
    }
    static set ALL(item){
      if(
        !LiaisonStigma.hasOwnProperty("allExceptions")
      )LiaisonStigma.allExceptions=item;
    }
    constructor(...args){
      super(...args);
      //this.name=Skriptonus.executeBaptism;
      LiaisonStigma.ALL.push(this);
    }
    /*
    destructor(){
      LiaisonStigma.ALL.splice(
        LiaisonStigma.ALL.indexOf(this),
        1
      );
    }
    */
    memberPrinciple(item){
      return item instanceof Skriptonus.BeingExistance
    }
    invite(target){
      if(this.memberPrinciple(target)){
        if(this.members.includes(target))this.members.push(target);
        return true;
      }else{
        return false;
      }
    }
    relegate(target){
      if(this.members.includes(target)){
        this.members.splice(this.members.indexOf(target), 1);
        return true;
      }else{
        return false;
      }
    }
    //get value(){
      //return this.data;
    //}
    //set value(indata){
      //this.data=indata;
    //}
  };
}
