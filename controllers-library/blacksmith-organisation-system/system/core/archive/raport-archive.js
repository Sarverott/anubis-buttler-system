module.exports={
  UPDATE(){

  },
  PUBLISH(){

  },
  WRITE(bosItem){
    return {
      path:bosItem.dirpath,
      name:bosItem.name
      //contains:bosItem.subjects.map(function(subject){
      //  return subject.id
      //})
    };
  },
  READ(){

  }
}
