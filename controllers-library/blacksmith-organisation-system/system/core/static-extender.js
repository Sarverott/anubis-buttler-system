const fs=require("fs");
module.exports={
  SAFE_CREATE_DIR(path){
    fs.mkdirSync(path,{recursive:true})
  },
  WRITE_OUTPUT_FILE(filepath, output, readable=false){
    fs.writeFileSync(
      filepath,
      JSON.stringify(
        ...((readable)?[output, null, '\t']:[output])
      )
    );
  },
  READ_INPUT_FILE(filepath){
    return JSON.parse(fs.readFileSync(
      filepath
    ));
  }
}
