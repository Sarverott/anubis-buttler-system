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
  READ(){
    var tmpSheme=new BOS.Sheme(id, data.path, data.name);
    return tmpSheme;
  }
}
