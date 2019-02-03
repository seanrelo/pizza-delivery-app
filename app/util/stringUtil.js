/**
* File for util function over string
*
**/

//Dependencies
var crypto = require('crypto');
var params = require('../config/params');
// Instantite the util object
stringUtil = {};

// Validate email
stringUtil.validateEmail = function(email){
  var emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailExpression.test(email);
};


// Create a sha256 hash
stringUtil.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256',params.hashingScreter).update(str).digest('hex');
    return hash;
  }else{
    return false;
  }
};

// Create a random string of a give length
stringUtil.randomString = function(len){
  var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var finalString = '';
  for(var i=0;i<= len;i++){
    var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    finalString += randomCharacter;
  }

  return finalString;
};

// module export
module.exports = stringUtil;
