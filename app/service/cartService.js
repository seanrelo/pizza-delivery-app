/**
* File for bussiness rules of cart entity
*
*/

//Dependencies
var _data = require('../util/fileUtil');
var _objectUtil = require('../util/objectUtil');
var tokenService = require('./tokenService');
//Instantite the object
var cartService = {};

cartService.createCart = function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
      var carts = _data.read('carts',data.email);
      if(_objectUtil.isEmptyObject(carts)){
        try{
          _data.create('carts',data.email,data);
          callback(201,{'Success':'The cart is created'});
        }catch(e){
          callback(500,{'Error':'Could not create the cart'});
        }
      }else{
        callback(409,{'Error':'The user has already a cart'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}

cartService.getCart = function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
      var cart = _data.read('carts',data.email);
      if(_objectUtil.isEmptyObject(cart) == false){
        callback(200,cart)
      }else{
        callback(404,{'Error':'Could not found the cart'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}

cartService.updateCart = function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
      var carts = _data.read('carts',data.email);
      if(_objectUtil.isEmptyObject(carts) == false){
        carts.items = data.items;
        _data.update('carts',data.email,carts);
        callback(200,{'Success':'The carts was updated'});
      }else{
        callback(404,{'Error':'Could not found the cart'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}

cartService.deleteCart = function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
      var carts = _data.read('carts',data.email);
      if(_objectUtil.isEmptyObject(carts) == false){
        _data.delete('carts',data.email);
        callback(200,{'Success':'The carts was deleted'});
      }else{
        callback(404,{'Error':'Could not found the cart'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}
module.exports = cartService;
