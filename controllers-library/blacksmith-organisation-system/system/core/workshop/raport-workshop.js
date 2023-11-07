const {BOS}=require("./../main.js");
module.exports={
  UPDATE(){

  },
  PUBLISH(){

  },
  WRITE(bosItem){
    return {
      label:bosItem.label,
      forges:bosItem.items.forges.map(function(subject){
        return subject.id
      }),
      archives:bosItem.items.archives.map(function(subject){
        return subject.id
      })
    }
  },
  READ(id, data){
    var tmpWorkshop=new BOS.Workshop(id, data.label);
    tmpWorkshop.addForge(...BOS.GET_IDS(...data.forges));
    tmpWorkshop.addArchive(...BOS.GET_IDS(...data.archives));
    return tmpWorkshop;
  }
}
