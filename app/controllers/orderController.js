/*
*
* File for controller the order request
*
*/


// Dependencies
var stringUtil = require('../util/stringUtil');
var orderService = require('../service/orderService');

// Instantite the order object
order ={};

// Principal method of the controller
order.principal = function(data,callback){
  order[data.method](data,callback);
};

order.post = function(data,callback){
  var header = data.headers;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;

  if(token && email){
    var orderObject = {
      "token":token,
      "email":email
    };
    orderService.createOrder(orderObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}

module.exports = order;
