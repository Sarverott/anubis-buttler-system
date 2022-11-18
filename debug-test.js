const Skriptonus = require('./skriptonus');
const path = require('path');
function mainProcedure(){
  if(process.argv.includes("--test"))testEnviroment()

}
function testEnviroment(){
  var classTestList=[
    "AbsolutFormula","ArchitectonicStructure","AuthoritarDeity",
    "BeingExistance","CharmProcedure","CultSect",
    "CurseIgniter","DemonicEntity","DivineArtifact",
    "FatumContinuum","FundamentalInformation","GatewayKirk",
    "GlamourExpression","GrimmMonastry","GuardingIdol",
    "InquisitionGuild","LiaisonStigma","LuminocityMatter",
    "LureInurement","MakersChapel","ObscurityMatter",
    "PantheonAssociacion","ProphetHost","RegularPerson",
    "SorcerersTumb","SpiritualPreacher","TempleUnion",
    "WorshipShrine"
  ]
  Skriptonus.plantBearing("./seed-of-skriptonus.json")
  if(process.argv.includes("--list-phillars")){
    for(var item of Skriptonus.loadPhillarsPaths()){
      if(process.argv.includes("--kebabcase"))
        console.log(path.basename(item, ".js"));
      else if(process.argv.includes("--pascalcase"))
        console.log(Skriptonus.elementalDraft(item));
      else if(process.argv.includes("--filenames"))
        console.log(item);
      else console.log(path.basename(item, ".js").split("-").join(" "));
    }
  }
  Skriptonus.enchantNature();
  if(process.argv.includes("--all-classes")){
    console.log(Skriptonus);
    if(process.argv.includes("--new-instances")){
      classTestList.foreach(function(label){
        var TmpClassHook=Skriptonus[label];
        console.log(new TmpClassHook());
      });
    }else{
      classTestList.foreach(function(label){
        console.log(Skriptonus[label]);
      });
    }
    console.log(Skriptonus);
  }
  if(process.argv.includes("--monitor-initiation")){
    console.log(Skriptonus.theBigBang());
    console.log(Skriptonus.UNIVERSE.constructor.name);
    //var testworld=new Skriptonus();
  }
}
mainProcedure()
