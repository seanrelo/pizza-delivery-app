/**
* File for bussiness rules of menu items
*
*/


// Dependencies
var _data = require('../util/fileUtil');
var tokenService = require('./tokenService');
//Instantite menuService Object
var menuService = {};

menuService.getMenu = function(data,callback){
  try{

    var validObject = tokenService.validToken(data);
    console.log(validObject);
    if(validObject && validObject.valid == true){
      var menu = _data.read('menu','menuRepository');
      if(menu.length > 0){
        callback(200,menu);
      }else{
        callback(404,{'Error':'Could not get the menu'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
};


module.exports = menuService;
