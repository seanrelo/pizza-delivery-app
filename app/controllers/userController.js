/**
* File for controller the rquest of the user entity
*
**/

//Dependencies
var stringUtil = require('../util/stringUtil');
var _data = require('../util/fileUtil');
var userService = require('../service/userService');

// Instantite  the user object
var user = {}

// Principal method of the controller
user.principal = function(data,callback){
  user[data.method](data,callback);
};
// Controller  the post request
// Required data: firstName, lastName,email,streetAddress,password
// Optional data:none
user.post = function(data,callback){
  // Validate the payload
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if(firstName && lastName && email && streetAddress && password){
    userService.createUser(data,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
};

//  Controller the get request
// Required data : email
// Optional :none
user.get = function(data,callback){
  var header = data.headers;

  var email = typeof(data.query.email) == 'string' && data.query.email.trim().length > 0 && stringUtil.validateEmail(data.query.email) ? data.query.email.trim() : false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  if(email && token){
    var userObject = {"email":email,"token":token};
    userService.getUser(userObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}

// Controller the put request
// Required data : email
// Optional data : firstName, lastName, streetAddress , password (at least one of them)
user.put = function(data,callback){
  // validate the payload
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && stringUtil.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  var streetAddress = typeof(data.payload.streetAddress) == 'string' && data.payload.streetAddress.trim().length > 0 ? data.payload.streetAddress.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  var header = data.headers;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;

  if(email && token){
    if(firstName || lastName || streetAddress || password){
      var userObject = {
        "firstName":firstName,
        "lastName":lastName,
        "email": email,
        "streetAddress": streetAddress,
        "password":password,
        "token": token
      };
      userService.updateUser(userObject,callback);
    }else{
      callback(400,{'Error':'At least one of the properties of the user has to be set'});
    }
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}

// Controller the delete Request
// Require data : email
// Optioncal data: none
user.delete = function(data,callback){
  var header = data.headers;
  var email = typeof(data.query.email) == 'string' && data.query.email.trim().length > 0 ? data.query.email.trim() : false;
  var token = typeof(header.token) == 'string' && header.token.trim().length > 20 ? header.token.trim() : false;
  console.log(email);
  console.log(token);
  if(email && token){
    var userObject  = {"email":email,"token":token};
    userService.deleteUser(userObject,callback);
  }else{
    callback(400,{'Error':'Missing  required field'});
  }
}
// Export the module
module.exports = user;
