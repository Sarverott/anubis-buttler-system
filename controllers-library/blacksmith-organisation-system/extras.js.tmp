/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const fs=require("fs");
const path=require("path");
const crypto=require("crypto");

function safeCreateDir(...args){
  if(!fs.existsSync(path.join(...args))){
    fs.mkdirSync(path.join(...args));
  }
}
function getDirContent(path){
  var content=[];
  var list=fs.readdirSync(path);
  for(var i in list){
    if(list[i][0]!=".."&&list[i][0]!="."){
      var item={
        path:path.join(path, list[i]),
        name:list[i],
        type:"unknown"
      };
      var tmpstat=fs.statSync(item.path);
      if(tmpstat.isDirectory()){
        item.type="directory";
      }else if(tmpstat.isFile()){
        item.type="file"
      }
      content.push(item);
    }
  }
  return content;
}
function getFilelist(path, dotted=false, fullpath=true){
  var files=[];
  var list=fs.readdirSync(path);
  for(var i in list){
    if(list[i][0]=="."||dotted){
      var tmppath=path.join(path, list[i]);
      var tmpstat=fs.statSync(tmppath);
      if(tmpstat.isDirectory()){
        files.concat(getFilelist(tmppath));
      }else if(tmpstat.isFile()){
        if(fullpath){
          files.push(tmppath);
        }else{
          files.push(list[i]);
        }
      }
    }
  }
  return files;
}
function joinPath(...args){
  return path.join(...args)
}
function getChecksum(path){
  return crypto
    .createHash('md5')
    .update(
      fs.readFileSync(path),
      'utf8'
    )
    .digest('hex');
}
function addChangeListener(path, action){
  return fs.watch(path, action);
}
function fileExists(path){
  return fs.existsSync(path);
}

module.exports={
  joinPath,
  getFilelist,
  getChecksum,
  addChangeListener,
  fileExists
}
