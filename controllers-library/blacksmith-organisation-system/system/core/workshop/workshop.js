/*
  blacksmith-organization-system
  part of Anubis System
  Sett Sarverott 2019
*/
const fs=require("fs");
const path=require("path");
const {BOS, SE}=require("./../main.js");
class BlacksmithWorkshop extends BOS{
  //static counter=0;
  setup(label){
    this.items={
      archives:[],
      forges:[],
      projects:[],
      superprojects:[],
      shemes:[],
      throwboxes:[],
      sarcophags:[]
    };
    this.label=label;
    this.extensions=[];
    this.configuration={};
    //this.configurationPath=""
  }

  saveConfiguration(filepath, readable=false){
    var configuration={
      "archives":[],
      "forges":[],
      //"sarcophags":[],
      "superprojects":[],
      "projects":[],
      "shemes":[],
      "throwboxes":[]
    };
    for(var i in configuration){
      for(var j in this[i]){
        configuration[i].push(
          this[i][j].getRaport()
        );
      }
    }
    //this.configuration.enviroment
    configuration.hostname=HOSTNAME;
    this.configuration[path.basename(filepath, ".json")]=configuration;
    fs.writeFileSync(
      filepath,
      JSON.stringify(
        ...(
          (readable)
          ?
          [configuration, null, '\t']
          :
          [configuration]
        )
      )
    );
  }
  loadConfiguration(dirpath){
    var configuration={};
    var configList=fs.readdirSync(
      dirpath,
      {withFileTypes:true}
    );
    for(var i in configList){
      if(
        configList[i].isFile()
        &&
        path.extname(configList[i].name)==".json"
      ){
        this.configuration[
          path.basename(configList[i].name, ".json")
        ]=JSON.parse(
          fs.readFileSync(
            path.join(dirpath, configList[i].name)
          )
        );
      }
    }
  }

  getByName(type, name){
    var output=[];
    for(var i in this.items[type]){
      if(this.items[type][i].name==name)output.push(this.items[type][i]);
    }
    if(output.length()==1){
      return output[0];
    }else if(output.length()>1){
      return output;
    }else return null;
  }
  archivesSetup(...archiveConfig){
    for(var i in archiveConfig){
      this.items.archives.push(
        new BOS.Archive(
          this,
          archiveConfig[i].path,
          archiveConfig[i].name
        )
      );
    }
  }
  forgesSetup(...forgeConfig){
    for(var i in forgeConfig){
      this.items.forges.push(
        new BOS.Forge(
          this,
          forgeConfig[i].path,
          forgeConfig[i].name
        )
      );
    }
  }
  addArchive(...archiveHook){
    for(var i in archiveHook){
      archiveHook[i].workshop=this;
      this.items.archives.push(archiveHook[i]);
      this.emitter.emit('add-archive', this, archiveHook[i]);
    }
  }
  addForge(...forgeHook){
    for(var i in forgeHook){
      forgeHook[i].workshop=this;
      this.items.forges.push(forgeHook[i]);
      for(var j in forgeHook[i].subjects){
        this.addNewSuperproject(forgeHook[i].subjects[j]);
        for(var k in forgeHook[i].subjects[j].subjects){
          var tmpSub=forgeHook[i].subjects[j].subjects[k];
          if(tmpSub instanceof BOS.Sheme)this.addNewSheme(tmpSub);
          if(tmpSub instanceof BOS.Project)this.addNewProject(tmpSub);
        }
        /*
        for(var k in forgeHook[i].subjects[j].throwboxes){
          var tmpSub=forgeHook[i].subjects[j].throwboxes[k];
          if(tmpSub instanceof BOS.Sheme)this.addNewSheme(tmpSub);
          if(tmpSub instanceof BOS.Project)this.addNewProject(tmpSub);
        }
        */
      }
      this.emitter.emit('add-forge', this, forgeHook[i]);
    }
  }
  addNewSuperproject(...superprojectHook){
    for(var i in superprojectHook){
      superprojectHook[i].workshop=this;
      this.items.superprojects.push(superprojectHook[i]);
      this.emitter.emit('add-superproject', this, superprojectHook[i]);
    }
  }
  addNewSheme(...shemeHook){
    for(var i in shemeHook){
      shemeHook[i].workshop=this;
      this.items.shemes.push(shemeHook[i]);
      this.emitter.emit('add-sheme', this, shemeHook[i]);
    }
  }
  addNewProject(...projectHook){
    for(var i in projectHook){
      projectHook[i].workshop=this;
      this.items.projects.push(projectHook[i]);
      this.emitter.emit('add-project', this, projectHook[i]);
    }
  }
  /*
  uploadSuperprojectDir(source, destination){
    var itemHook=BOS.idList("get-id", destination);
    if(itemHook instanceof BOS.Forge){
      source
      itemHook.addSubject(
        new BOS.Superproject(
          path.join(itemHook.dirpath, name),
          name
        )
      );
    }else if(itemHook instanceof BOS.Archive){

    }
  }
  */
  /*uploadProjectDir(source, superproject, destination=null){
    var itemHook=BOS.idList("get-id", destination);
    if(itemHook instanceof BOS.Forge){
      var tmp=new BOS.Superproject(
        path.join(itemHook.dirpath, name),
        name
      )
      itemHook.addSubject(
        tmp
      );
    }else if(itemHook instanceof BOS.Archive){

    }
    destination
  }*/
          //czy znasz gościa w cmentarnych szatach z misiem pod pachą
};
BOS.SET_RAPORT(
  BlacksmithWorkshop,
  require("./raport-workshop.js")
);
module.exports=BlacksmithWorkshop;
