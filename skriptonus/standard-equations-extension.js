const fs=require("fs");
const path = require('path');

module.exports={
  JSONs:{
    ext(name){
      return path.extname(name)==".json";
    },
    load(filepath){
      var jsonData=fs.readFileSync(filepath);
      if(this.verify(jsonData))return JSON.parse(jsonData);
      else return null;
    },
    save(filepath, context){
      fs.writeFileSync(filepath, JSON.stringify(context))
    },
    verify(jsonString){
      try{
        JSON.parse(jsonString);
        return true;
      }catch(e){
        return false;
      }
    }
  },
  ROCKCRYPTs:{
    Fibonacci:class Fibonacci{
    	constructor(){
    		this.last=1;
    		this.beforeLast=1;
    	}
    	next(){
    		var tmp=this.last;
    		this.last+=this.beforeLast;
    		this.beforeLast=tmp;
    	}
    },
    purpleLightTimekeeper(data, key){
      //console.log(data);
    	var  fib=new this.Fibonacci();
    	var encoded="";
    	for(var i=0;i<data.length;i++){
        //console.log(data.charCodeAt[i]-key.charCodeAt[fib.last%key.length]);
    		var tmp=data.charCodeAt(i)-key.charCodeAt(fib.last%key.length);
    		(tmp<0)?tmp+=256:true;
    		encoded+=String.fromCharCode(tmp);
    		fib.next();
    	}
    	return encoded;
    },
    get plt(){return this.purpleLightTimekeeper;},
    timekeepLightPurpler(data, key){
    	var  fib=new this.Fibonacci();
    	var decoded="";
    	for(var i=0;i<data.length;i++){
    		var tmp=data.charCodeAt(i)+key.charCodeAt(fib.last%key.length);
    		(tmp>255)?tmp-=256:true;
    		decoded+=String.fromCharCode(tmp);
    		fib.next()
    	}
    	return decoded;
    },
    get tlp(){return this.timekeepLightPurpler;}
  },
  MINISTRs:{
    timestampEncode(n){
      var matrix="qwertyuiopasdfghjklzxcvbnm1234567890";
      var out="";
      while(n>0){
        out+=matrix[n%matrix.length];
        n=Math.floor(n/matrix.length);
      }
      return out;
    },
    ipac(ipAddress){
      //console.log(ipAddress);
      var cryptoip=[];
      ipAddress.split(".").forEach(function(data){
        cryptoip.push(
          parseInt(data)%16,
          Math.floor(parseInt(data)/16)
        );
      });
      //console.log(cryptoip);
      var output=""
      for(var i=0; i<8; i++){
        output+=this.interfaceCharCoding(
          cryptoip[i]
        );
      }
      return output;
    },
    maco(macAddress){
      var cryptomac=[];
      //console.log(macAddress.split(""))
      macAddress.split("").filter(
        function(data){
          return data!=":";
        }
      ).forEach(
        function(data){
          if(isNaN(data)){
            cryptomac.push(
              (10+data.toLowerCase().charCodeAt(0)-97)%4,
              Math.floor((10+data.toLowerCase().charCodeAt(0)-97)/4)
            );
          }else{
            cryptomac.push(
              parseInt(data)%4,
              Math.floor(parseInt(data)/4)
            );
          }
        }
      );
      var output=""
      for(var i=0; i<8; i++){
        output+=this.interfaceCharCoding(
          cryptomac[i*3]+cryptomac[i*3+1]*4+cryptomac[i*3+2]*16
        );
      }
      return output;
    },
    interfaceCharCoding(data){
      if(data<0){
        throw "to_low";
      }
      if(data==0){
        return String.fromCharCode(46);
      }
      data--;
      if(data<10){
        return String.fromCharCode(48+data);
      }
      data-=10;
      if(data<26){
        return String.fromCharCode(65+data);
      }
      data-=26;
      if(data<26){
        return String.fromCharCode(97+data);
      }
      data-=26;
      if(data==0){
        return String.fromCharCode(95);
      }
      throw "to_high";
    }
  },
  RANDSTRs:{
    fromMatrix(len=9, matrix='qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM_-.#@'){
  		var ret='';
  		for(var i=0;i<len;i++){
  			ret+=matrix.charAt(Math.floor(Math.random()*matrix.length));
  		}
  		return ret;
  	},
    betweenCharCodes(l=15, F="!".charCodeAt(0), L="~".charCodeAt(0)){
  		var o="";
  	  while(l--)o+=String.fromCharCode(Math.floor(Math.random()*(L-F)+F));
  	  return o;
  	},
    withCharCodesRange(l=15, F="!".charCodeAt(0), L="~".charCodeAt(0)){
      var a=new Array(l);
      var r=function(x){
        //console.log(Math.random()*(L-F)+F);
        return Math.random()*(L-F)+F;
      }
      var o=a.fill(0).map(r);
      return String.fromCharCode(...o);
    },
    betweenChars(l=15, F="!", L="~"){
      return String.fromCharCode(...Array(l).fill(0).map(function(){
        return Math.random()*(L.charCodeAt(0)-F.charCodeAt(0))+F.charCodeAt(0);
      }));
    }
  }
};
