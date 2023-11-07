const {BOS}=require("./../main.js");
module.exports={
  UPDATE(){

  },
  PUBLISH(){

  },
  WRITE(bosItem){
    return {
      path:bosItem.dirpath,
      name:bosItem.name,
      status:bosItem.content.status,
      files:bosItem.content.files
    };
  },
  READ(id, data){
    var tmpProject=new BOS.Project(id, data.path, data.name);
    return tmpProject;
  }
}
