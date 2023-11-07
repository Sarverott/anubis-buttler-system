/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const {BOS}=require("./../main.js");
class BlacksmithSuperproject extends BOS.Subject{
  afterConstruct(){
    this.subjects=[];
    this.throwbox=[];
  }
  addSubject(...subjectHook){
    for(var i in subjectHook){
      this.subjects.push(subjectHook[i]);
      subjectHook[i].superproject=this;
    }
  }
  addThrowbox(){
    //this.throwbox.unshift(new BOS.Throwbox());
    //this.emitter.emit('add-sheme');
  }
  fillThrowbox(){
    this.throwbox[0].fill();
  }
}
BOS.SET_RAPORT(
  BlacksmithSuperproject,
  require("./raport-superproject.js")
);
module.exports=BlacksmithSuperproject;
