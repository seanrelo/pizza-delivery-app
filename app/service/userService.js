/**
*  File for bussiness rules of users
*
*/

// Dependencies
var _data = require('../util/fileUtil');
var _stringUtil = require('../util/stringUtil');
var _objectUtil = require('../util/objectUtil');
var tokenService = require('./tokenService');

// Instantite userService object
var userService = {};

userService.createUser = function(data,callback){
  // See if the user does not exist
  try{
      var userData = _data.read('users',data.payload.email);
      if(_objectUtil.isEmptyObject(userData)){
        // Create a password
        var hashedPassword = _stringUtil.hash(data.payload.password);

        if(hashedPassword){
          var userObject = {
            'firstName': data.payload.firstName,
            'lastName': data.payload.lastName,
            'email':data.payload.email,
            'streetAddress': data.payload.streetAddress,
            'hashedPassword': hashedPassword
          };

          try{
            _data.create('users',data.payload.email,userObject);
            callback(201,{'Success':'The user is created'});
          }catch(e){
            console.log(e);
            callback(500,{'Error':'Could not create the user'});
          }
      }else{
        callback(500,{'Error':'Could not hash the user\'s password'});
      }
    }else{
      callback(409,{'Error':'the email:'+data.payload.email+' already exists'});
    }
  }catch(e){
    console.log(e);
  }
};

userService.getUser = function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
       var userData = _data.read('users',data.email);
       delete userData.hashedPassword;
       callback(200,userData);
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
};

userService.updateUser = function(data,callback){
  try{
    var dataToken = {"email":data.email,"token":data.token};
    var validObject = tokenService.validToken(dataToken);
    if(validObject && validObject.valid == true){
      var userData = _data.read('users',data.email);
      if(!_objectUtil.isEmptyObject(userData)){
        if(data.firstName && data.firstName !== ''){
          userData.firstName = data.firstName;
        }
        if(data.lastName && data.lastName !== ''){
          userData.lastName = data.lastName;
        }
        if(data.streetAddress && data.streetAddress !== ''){
          userData.streetAddress = data.streetAddress;
        }
        if(data.password && data.password !== ''){
          var hashedPassword = _stringUtil.hash(data.payload.password);
          if(hashedPassword){
            userData.hashedPassword = hashedPassword;
          }
        }

        try{
          _data.update('users',data.email,userData);
          callback(200,{'Success':'The user was updated'});
        }catch(e){
          console.log(e);
          callback(500,{'Error':'Could not update the user'});
        }
      }else{
        callback(409,{'Error': 'The user doesnt exists'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
};

userService.deleteUser = function(data,callback){
  try{
    var dataToken = {"email":data.email,"token":data.token};
    var validObject = tokenService.validToken(dataToken);
    if(validObject && validObject.valid == true){
      var userData = _data.read('users',data.email);
      if(!_objectUtil.isEmptyObject(userData)){
        _data.delete('users',data.email);
        callback(200,{'Success':'The user was deleted'});
      }else{
        callback(409,{'Error':'The user doesnt exists'});
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}
// module export|
module.exports = userService;
