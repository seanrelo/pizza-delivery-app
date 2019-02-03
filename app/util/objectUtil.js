/**
*
* File for util function over object
*
*/

// Instantite util object
objectUtil = {};

objectUtil.perseJsonToObject = function(json){
  try{
    var obj = JSON.parse(json);
    return obj;
  }catch(e){
    return {};
  }
};

objectUtil.isEmptyObject = function(obj) {
  var keys = Object.keys(obj).length;
  console.log(keys);
  if(keys > 0){
    return false;
  }else{
    return true;
  }
  //return !Object.keys(obj).length;
}


// export module util
module.exports = objectUtil;
