/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const {BOS}=require("./../main.js");
class BlacksmithSheme extends BOS.Subject{
  afterConstruct(){
    //this.readContent();
  }
};
BOS.SET_RAPORT(
  BlacksmithSheme,
  require("./raport-sheme.js")
);
module.exports=BlacksmithSheme;
