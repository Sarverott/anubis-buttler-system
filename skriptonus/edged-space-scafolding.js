const fs=require("fs");
const path = require('path');

module.exports={

  universe:null,
  phillars:{},
  sigilsToSpellsList:{},
  ygdrasilion:{
    rootSheme:null,
    branchShematics:[]
  },

  phillarsDirPath:"./system/",
  excludeFromBase:["skriptonus.js"],
  ignoredInRealmTree:["./"],
  singularityPath:"..",
  namebase:null,
  summonSpell:null,

};
