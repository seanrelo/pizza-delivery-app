/**
*
* File for controller the cart request
*
*/

// Dependencies
var cartService = require('../service/cartService');
var stringUtil = require('../util/stringUtil');
// Instantite the object
var cart = {};

// Principal method of the controller
cart.principal = function(data,callback){
  cart[data.method](data,callback);
};

// Controller the post request
// Required Data: email,and array of menu items
cart.post = function(data,callback){
  var header = data.headers;

  var menuItems = typeof(data.payload.items) == 'object' && data.payload.items instanceof Array && data.payload.items.length > 0 ? data.payload.items: false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;

  if(menuItems && email && token){
    var cartObject = {"email": email,"token": token,"items":menuItems};
    cartService.createCart(cartObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
};

// Controller the get request
// Required data : email
cart.get = function(data,callback){
  var header = data.headers;
  var email = typeof(data.query.email) == 'string' && data.query.email.trim().length > 0 && stringUtil.validateEmail(data.query.email) ? data.query.email.trim() : false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  if(email && token){
    var getObject = {
      "email":email,
      "token":token
    }
    cartService.getCart(getObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}

// Controller the put Request
// Required data: email,item -> all the items wil be replace
cart.put = function(data,callback){
  var header = data.headers;
  var menuItems = typeof(data.payload.items) == 'object' && data.payload.items instanceof Array && data.payload.items.length > 0 ? data.payload.items: false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;

  if(menuItems && email && token){
    var cartObject = {"email": email,"token": token,"items":menuItems};
    cartService.updateCart(cartObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}

// Controller the delete request
// Requiere data: email
cart.delete = function(data,callback){
  var header = data.headers;
  var email = typeof(data.query.email) == 'string' && data.query.email.trim().length > 0 && stringUtil.validateEmail(data.query.email) ? data.query.email.trim() : false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  if(email && token){
    var deleteObject = {
      "email":email,
      "token":token
    }
    cartService.deleteCart(deleteObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}


module.exports = cart;
