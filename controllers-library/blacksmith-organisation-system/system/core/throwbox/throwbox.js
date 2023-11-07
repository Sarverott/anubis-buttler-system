/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const {BOS}=require("./../main.js");
class BlacksmithThrowbox extends BOS.Subject{
  afterConstruct(){
    //this.readContent();
  }
}
BOS.SET_RAPORT(
  BlacksmithThrowbox,
  require("./raport-throwbox.js")
);
module.exports=BlacksmithThrowbox;
