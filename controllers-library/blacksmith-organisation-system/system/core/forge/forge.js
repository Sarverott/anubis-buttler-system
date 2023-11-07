/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const path=require("path");
const fs=require("fs");
const {BOS, SE}=require("./../main.js");
class BlacksmithForge extends BOS{
  setup(workshopHook, dirpath, name=path.basename(dirpath)){
    this.workshop=workshopHook;
    SE.SAFE_CREATE_DIR(dirpath);
    this.dirpath=dirpath;
    this.name=name;
    this.subjects=[];
    //this.workshop.emitter.emit('create-forge');
  }
  loadDirContentAsForge(){
    var listDirs=fs.readdirSync(this.dirpath, {withFileTypes:true});
    for(var i in listDirs){
      if(listDirs[i].isDirectory()){
        //var tmpGroup=this.createSuperproject(listDirs[i].name);
        this.createSuperproject(listDirs[i].name);
        var listSubDirs=fs.readdirSync(
          path.join(
            this.dirpath,
            listDirs[i].name
          ), {withFileTypes:true});
        for(var j in listSubDirs){
          if(listSubDirs[j].isDirectory()){
            this.createProject(
              listSubDirs[j].name,
              listDirs[i].name
            );
          }
        }
      }
    }
  }
  addSubject(...subjectHook){
    for(var i in subjectHook){
      this.subjects.push(subjectHook[i]);
      subjectHook[i].forge=this;
    }
  }
  getSuperprojectByName(name){
    for(var i in this.subjects){
      if(this.subjects[i].name==name)return this.subjects[i];
    }
    return null;
  }
  createSuperproject(name, dirpath=path.join(this.dirpath, name)){
    var superprojectHook=new BOS.Superproject(
      dirpath,
      name
    );
    superprojectHook.forge=this;
    this.workshop.addNewSuperproject(superprojectHook);
    this.subjects.push(superprojectHook);
    //return superprojectHook;
  }
  createProject(name, groupName, dirpath=path.join(this.dirpath, groupName, name)){
    var projectHook=new BOS.Project(
      dirpath,
      name
    );
    projectHook.forge=this;
    this.getSuperprojectByName(groupName).addSubject(projectHook);
    this.workshop.addNewProject(projectHook);
  }
  createSheme(name, groupName, dirpath=path.join(this.dirpath, groupName, name)){
    var shemeHook=new BOS.Sheme(
      dirpath,
      name
    );
    shemeHook.forge=this;
    this.getSuperprojectByName(groupName).addSubject(shemeHook);
    this.workshop.addNewSheme(shemeHook);
  }
}
BOS.SET_RAPORT(
  BlacksmithForge,
  require("./raport-forge.js")
);
module.exports=BlacksmithForge;
