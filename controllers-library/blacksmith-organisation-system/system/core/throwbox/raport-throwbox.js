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

  }
}
