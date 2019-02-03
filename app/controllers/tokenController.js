/**
* File to control the request for the token
*
*/

// Dependencies
var tokenService = require('../service/tokenService');

// Instantite the object
var token = {};

// Principal method of the controller
token.principal = function(data,callback){
  token[data.method](data,callback);
};

// Controller  the post request
// Required data: firstName, lastName,email,streetAddress,password
// Optional data:none
token.post = function(data,callback){
  // Validate the payload
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if(email && password){
    tokenService.createToken(data,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
};

// Controller the delete request
token.delete = function(data,callback){
  // validate the request
  var token = typeof(data.query.token) == 'string' && data.query.token.trim().length > 20 ? data.query.token.trim() : false;

  if(token){
    var tokenObject = {"token":token};
    tokenService.deleteToken(tokenObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}
// expotar  el modulo
module.exports = token;
