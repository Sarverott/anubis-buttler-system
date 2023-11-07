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
      includes:bosItem.subjects.map(function(subject){
        return subject.id
      }),
      throwboxes:bosItem.throwbox.map(function(subject){
        return subject.id
      })
    };
  },
  READ(id, data){
    var tmpSuperproject=new BOS.Superproject(id, data.path, data.name);
    tmpSuperproject.addSubject(...(BOS.GET_IDS(...data.includes)));
    return tmpSuperproject;
  }
}
