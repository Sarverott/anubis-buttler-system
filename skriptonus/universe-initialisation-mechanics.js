const fs=require("fs");
const path = require('path');

module.exports={
  defineSingularityPoint(startpath){
    this.singularityPath=startpath;
    this.debug("log", "singularity path = ", startpath);
  },
  plantBearing(seedOfSkriptonusPath){
    var realmBase=this.JSONs.load(seedOfSkriptonusPath);
    this.debug("log", "realm seed path = ", seedOfSkriptonusPath);
    this.debug("log", "is seed's JSON valid? = ", realmBase != null);
    if(realmBase == null)this.debug("error", "ERROR: seed is not able to define universe");
    this.realmOutlinesDeseeding(realmBase);
  },
  realmOutlinesDeseeding(parsedSeedJson){
    this.phillarsDirPath=path.join(__dirname, parsedSeedJson["draftopedia"]); //core-fundations
    this.excludeFromBase=parsedSeedJson["excluded"]["from-basecode"]; //ignore when loading phillars list
    this.ignoredInRealmTree=parsedSeedJson["excluded"]["from-realm-branches"]; //ignore this directories when tree realm builder looks for summon spell declaration of branches
    //parsedSeedJson["cosmos-start-path"]; //here starts realm tree
    this.namebase=parsedSeedJson["namebase"]; //default base for creation of name if it's not set
    this.summonSpell=parsedSeedJson["summon-spell"]; //pattern for element declaration file
    this.debug("log", "Outlines deseeded!"/*, parsedSeedJson*/ );
  },
  getDraftsPaths(){
    var cosmicHook=this;
    return fs.readdirSync(
      this.phillarsDirPath,
      {withFileTypes:true}
    ).filter(
      (d)=>d.isFile()
    ).filter(
      (d)=>d.name[0]!='.'
      &&
      path.extname(d.name)==".js"
    ).filter(
      (d)=>!cosmicHook.excludeFromBase.includes(d.name)
    ).map(
      (d)=>path.join(this.phillarsDirPath, d.name)
    );
  },
  getDraftSpell(draft){ /* [DRAFTCALL]: fundamental-information <INTO> [SPELLNAME]: FundamentalInformation */
    return path.basename(draft, ".js")
      .split("-")
      .map((i)=>i[0].toUpperCase()+i.substr(1).toLowerCase())
      .join("");
  },
  getDraftSigil(draft){ /* [DRAFTCALL]: fundamental-information <INTO> [SPELLNAME]: FundamentalInformation */
    return path.basename(draft, ".js")
      .split("-")
      .map((i)=>i[0].toLowerCase())
      .join("");
  },
  castNature(){
    this.debug("log", "nature casting in progress..."/*, parsedSeedJson*/ );
    for(var itempath of this.getDraftsPaths()){
      this.phillarEnchantment(itempath, this.getDraftSpell(itempath));
      this.sigilsToSpellsList[this.getDraftSigil(itempath)]=this.getDraftSpell(itempath);
    }
    this.debug("log", "nature's drafts are in their places!" );
  },
  phillarEnchantment(itempath, draftsSpell){
    Object.defineProperty(this, draftsSpell, {
      get(){
        if(!this.phillars.hasOwnProperty(draftsSpell))
          this.phillars[draftsSpell]=require(itempath)(this);
        return this.phillars[draftsSpell];
      }
    });
  }
};
