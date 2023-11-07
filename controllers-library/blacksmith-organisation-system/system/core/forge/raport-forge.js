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
      contains:bosItem.subjects.map(function(subject){
        return subject.id
      })
    };
  },
  READ(id, data){
    var tmpForge=new BOS.Forge(id, null, data.path, data.name);
    tmpForge.addSubject(...BOS.GET_IDS(...data.contains));
    return tmpForge;
  }
}
