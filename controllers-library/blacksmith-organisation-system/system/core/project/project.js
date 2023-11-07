/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const {BOS}=require("./../main.js");
//const crypto=require("crypto");
class BlacksmithProject extends BOS.Subject{
  afterConstruct(){
    //this.readContent();
  }
};
BOS.SET_RAPORT(
  BlacksmithProject,
  require("./raport-project.js")
);
module.exports=BlacksmithProject;
