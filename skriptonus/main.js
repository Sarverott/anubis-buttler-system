/*
  SKRIPTONUS - application core system, for code poets, fans of darkness and very futuristic projects, initially target skeleton for Anubis project
  Copyright (C) 2022 Sett Sarverott
*/
const vm=require("vm");
const fs=require("fs");
const path=require("path");
const {EventEmitter, captureRejectionSymbol}=require('events');
//const helpingSet=;
//const ignitionSet=;
//const FatumConsequencion=require("./fatum-consequencion.js");

//global.creationPhillars=new FatumConsequencion();



class Skriptonus extends EventEmitter{
  constructor(enchantmentObject, spellPath){
    super();
    this.config=enchantmentObject;
    this.location=spellPath
    if(enchantmentObject.hasOwnProperty("summon-name"))this.name=enchantmentObject["summon-name"];
    else this.name=Skriptonus.executeBaptism;
  }

  static include(...extendingPaths){
    extendingPaths.forEach(
      (script)=>Object.assign(Skriptonus, require(script))
    );
  }
  static genesisDependencies(){
    Skriptonus.include(
      './standard-equations-extension.js',
      './edged-space-scafolding.js',
      './small-cosmic-debugger.js',
      './universe-initialisation-mechanics.js',
      './realm-tree-branching.js'
    );
  }
  static theBigBang(){
    Skriptonus.debug("BEG");
    //console.log("")
    Skriptonus.defineSingularityPoint(path.dirname(__dirname));
    Skriptonus.plantBearing(path.join(__dirname, "seed-of-realm.json"));
    Skriptonus.castNature();

    Skriptonus.buildSkeletonTree();
    //console.log(this.ygdrasilion.rootSheme);
    console.log(this.ygdrasilion.rootSheme);
    console.log(this);
    console.log(this.ygdrasilion.branchShematics);
    Skriptonus.debug("END");
  }
}

//Skriptonus.plantBearing("./seed-of-skriptonus.json")
module.exports=Skriptonus;
