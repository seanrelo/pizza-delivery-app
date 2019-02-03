/**
*File for controller the rquest of the user entity
*
**/

// Dependencies
var menuService = require('../service/menuService');

//Instantite the menu object
var menu = {};

// Principal method of the controller
menu.principal = function(data,callback){
  menu[data.method](data,callback);
};


// Controller the get Request
// Required data: none
menu.get = function(data,callback){
  var header = data.headers;

  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  if(token){
    var userObject = {
      "token": token
    };
    menuService.getMenu(userObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
};

module.exports = menu;
