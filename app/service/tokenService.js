/**
* File for bussiness rules of the token
*
**/

// Dependencies
var _data = require('../util/fileUtil');
var _objectUtil = require('../util/objectUtil');
var _stringUtil = require('../util/stringUtil');
var _objectUtil = require('../util/objectUtil');

// Instantite  object
var tokenService = {};


tokenService.createToken = function(data,callback){
  try{
    // Get the user data from the file
      var userData = _data.read('users',data.payload.email);
      if(_objectUtil.isEmptyObject(userData) == false){
        // hash the passworod that come from the payload
        var hashedPassword = _stringUtil.hash(data.payload.password);
        if(hashedPassword){
          // Compare the hash password and the password that is in the repository
          if(hashedPassword == userData.hashedPassword){
            var tokenId = _stringUtil.randomString(20);
            var expireDate = Date.now() + (1000 * 60 * 60);
            var tokenObject = {
              "email": data.payload.email,
              "tokenId":tokenId,
              "expireDate": expireDate
            };
            // Create the token
            try{
              _data.create('tokens',tokenId,tokenObject);
              callback(201,{'Success':tokenObject});
            }catch(e){
              callback(500,{'Error':'Could not create the token'});
            }
          }else{
            callback(409,{'Error':'Wrong password '});
          }
        }else{
          callback(500,{'Error':'Could not hash the user\'s password'});
        }
      }else{
        callback(404,{'Error':'the email:'+data.payload.email+' does not exists'});
      }
  }catch(e){
    console.log(e);
  }
};


tokenService.validToken = function(data){
  try{
    var valid = {"valid":false,"message":''};
    var tokenData  = _data.read('tokens',data.token);
    console.log(tokenData);
    if(_objectUtil.isEmptyObject(tokenData) == false){
      if(tokenData.expireDate <= Date.now()){
        valid.message = "The token has expire";
        return valid;
      }

      // This validation is used only when the email is required
      if(data.email && tokenData.email && data.email !== tokenData.email){
        valid.message = 'The email for the token doesnt match with the email of the request';
        return valid;
      }
      valid.valid = true;
      valid.message = 'The token es valid';
      return valid;
    }else{
      valid.valid = false;
      valid.message = 'The token doesnt exists';
      return valid;
    }

  }catch(e){
    console.log(e);
    valid.valid = false;
    valid.message = 'Could not validate the token';
    return valid;
  }
};


tokenService.deleteToken = function(data,callback){
  try{
    var tokenData  = _data.read('tokens',data.token);
    console.log(tokenData);
    if(!_objectUtil.isEmptyObject(tokenData)){
      _data.delete('tokens',data.token);
      callback(200,{'Error':'The token was deleted'});
    }else{
      callback(404,{'Error':'The token doesnt exists'});
    }
  }catch(e){
    console.log(e);
  }
}
//module export
module.exports = tokenService;
