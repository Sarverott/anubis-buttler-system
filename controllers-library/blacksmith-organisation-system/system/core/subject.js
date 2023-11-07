/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const {BOS, SE}=require("./main.js");
const fs=require("fs");
const path=require("path");
class BlacksmithSubject extends BOS{
  setup(dirpath, name=path.basename(dirpath)){
    SE.SAFE_CREATE_DIR(dirpath);
    //this.parrent=parrent;
    this.status="forged";
    this.name=name;
    this.dirpath=dirpath;
    //this.extensions=[];
    //this.history=[];
    this.mainWatchHook=null;
    this.content=this.refreshContent();
    //GITIGNORE READING NEEDED
    //this.files=[];
    this.watcher=function(){};
    //GITIGNORE READING NEEDED
  }
  refreshContent(){
    var content={};
    content.files=fs.readdirSync(
      this.dirpath,
      {withFileTypes:true}
    ).map(function(file){
      return {
        name:file.name,
        type:
          (file.isFile())
          ?
          "flie"
          :
          (
            (file.isDirectory())?"dir":"else"
          )
      }
    });
    content.status=fs.statSync(this.dirpath);
    return content;
  }
  mainWatch(command){
    switch(command){
      case "start":
        var tmpThis=this;
        this.mainWatchHook=fs.watch(this.dirpath,function(...args){
          args.push(tmpThis.refreshContent);
          tmpThis.watcher(...args);
        });
      break;
      case "stop":
        if(this.mainWatchHook)this.mainWatchHook.close();
      break;
    }
  }

  //GITIGNORE READING NEEDED
  /*
  readContent(dirpath=this.dirpath){
    var filelistTmp=fs.readdirSync(dirpath, {withFileTypes:true});
    var output=[];
    for(var i in filelistTmp){
      var tmpFile={
        "name":filelistTmp[i].name,
        "path":path.join(dirpath,filelistTmp[i].name)
      };
      fs.stat(tmpFile.path,function(err, data){
        tmpFile.status=data;
      });
      if(filelistTmp[i].isDirectory()){
        tmpFile.type="dir";
        tmpFile.content=this.readContent(tmpFile.path);
      }else if(filelistTmp[i].isFile()){
        tmpFile.type="file";
        var tmpThis=this;
        tmpFile.listener=fs.watchFile(tmpFile.path, function(...args){
          tmpThis.watcher(...args);
        });
      }else{
        tmpFile.type="else";
      }
      output.push(tmpFile);
    }
    if(dirpath===this.dirpath)this.files=output;
    return output;
    //fs.watch(path, action);
  }
  */
  //GITIGNORE READING NEEDED
  open(){
    this.emitter.emit('open');
  }
  create(){
    this.emitter.emit('create');
  }
  save(){
    this.emitter.emit('save');
  }
  close(){
    this.emitter.emit('close');
  }
  delete(){
    this.emitter.emit('delete');
  }
  move(){
    this.emitter.emit('move');
  }
  list(){
    this.emitter.emit('list');
  }
  upload(){
    this.emitter.emit('upload');
  }
  change(){
    this.emitter.emit('change');
  }
  /*loadStorybook(data){
    var tmp=[];
    for(var i in data){
      var tmptmp=new Fileitem(data[i].path);
      tmptmp.checksum=data[i].checksum;
      tmp.push(tmptmp);
    }
    return tmp;
  }
  checkAgreement(data){
    var tmp1=this.loadStorybook(data);
    var tmp2=this.scanFiles();
    for(var i in tmp1){
      for(var i in tmp1){

      }
    }
  }
  scanFiles(){
    var tmp=getFilelist(this.getPath());
    var tmpFiles=[]
    for(var i in tmp){
      var tmptmp=new Fileitem(tmp[i]);
      tmptmp.getChecksum();
      tmpFiles.push(tmptmp);
    }
    return tmpFiles;
  }*/
  //open(){
    //if(this.isOpened()){

    //  return false;
    //}else{

    //}
    //if(this.watcher==null){
    //  var tmpThis=this;
    //  this.watcher=addChangeListener(this.getPath(), function(eventType, filename){
    //    tmpThis.onChange(eventType, filename);
    //  });
    //}
    //this.onOpen();
  //}
  /*
  getWorkshop(){
    if(this.parrent instanceof BOS.Workshop){
      return this.parrent;
    }else{
      return this.parrent.parrent;
    }
  }
  getSuperproject(){
    if(this.parrent instanceof BOS.Workshop){
      return this;
    }else{
      return this.parrent;
    }
  }
  */
}
module.exports=BlacksmithSubject;
