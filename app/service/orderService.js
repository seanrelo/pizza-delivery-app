/**
*
*File for bussiness rules of order entity
*/

// Dependencies
var tokenService = require('./tokenService');
var _data = require('../util/fileUtil');
var _objectUtil = require('../util/objectUtil');
var params = require('../config/params');
const https = require('https');
const querystring = require('querystring');
//Instantite the object
var orderService = {};

orderService.createOrder =  async function(data,callback){
  try{
    var validObject = tokenService.validToken(data);
    if(validObject && validObject.valid == true){
      var userData = _data.read('users',data.email);
      if(_objectUtil.isEmptyObject(userData) == false){
        var cartData = _data.read('carts',data.email);
        if(_objectUtil.isEmptyObject(cartData) == false){
          var cost = orderService.calculateCost(cartData);
          if(cost){
            try{
              var paymentPromise =  await new Promise(function(resolve,reject){
                orderService.callStripe(cost,data.email,resolve,reject);
              });
              try{
                var senEmail = await new Promise(function(resolve,reject){
                  orderService.sendEmail(userData,resolve,reject);
                });
                callback(200,{
                  "Success":"ok",
                  "payment":paymentPromise,
                  "sendEmail":senEmail
                });
              }catch(e){
                callback(200,{'Error':'The payment works but the email fails','payment':paymentPromise});
              }
            }catch(e){
              callback(500,e);
            }
          }else{
            callback(500,{'Error':'Could not calculate the cost of the order'});
          }
        }else{
            callback(404,{'Error':'Could not found the cart'})
        }
      }else{
        callback(404,{'Error':'Could not found the user'})
      }
    }else{
      callback(403,{'Error':validObject.message});
    }
  }catch(e){
    console.log(e);
  }
}

orderService.calculateCost = function(cartData){
  var cost = 0;
  var complete = true;
  try{
    for(var i=0;i<cartData.items.length;i++){
      var item = cartData.items[i];
      if(item && item.price){
        cost += item.price;
      }else{
        complete = false;
      }
    }
    if(complete == false){
      return false;
    }else{
      return cost * 100;
    }
  }catch(e){
    console.log(e);
    return false;
  }
}

orderService.callStripe = function(cost,email,resolve,reject){
  try{
    var postData = querystring.stringify({
      "amount":cost,
      "currency":params.stripe.currency,
      "description":"Order del user:"+email,
      "source":params.stripe.source
    });
    console.log(postData);
    var options = {
      "hostname":params.stripe.hostname,
  		"path":params.stripe.path,
  		"method": 'POST',
  		"headers": {
  			'Content-Type': 'application/x-www-form-urlencoded',
  			'Content-Length': Buffer.byteLength(postData),
  			'Authorization': "Bearer "+params.stripe.secret
  		}
    };

    var req = https.request(options,function(res){
      console.log(res.statusCode);
      if(res.statusCode == 200){
        res.on('data',function(data){
          var parsedData = JSON.parse(data.toString('utf8'));
          resolve(parsedData);
        });
      }else{
        res.on('data',function(data){
          var parsedData = JSON.parse(data.toString('utf8'));
          reject({
            "Error":true,
            "message":parsedData
          });
        });
      }
    });

    req.on('error',function(e){
      reject({
        "Error":true,
        "message":"Occurs an Error:"+e.message
      });
    });

    req.write(postData);
    req.end();
  }catch(e){
    console.log(e);
  }
}

orderService.sendEmail = function(userData,resolve,reject){
  try{
    var postData = querystring.stringify({
      "from":params.mailGun.from,
      "to":userData.email,
      "subject":"Pizza Order",
      "text":"Hello,"+userData.firstName+" your pizza is payed and ready for shipment"
    });

    var options ={
      "hostname":params.mailGun.hostname,
      "path":params.mailGun.path,
      "method":'POST',
      "auth":params.mailGun.key,
      "headers":{
        'Content-Type': 'application/x-www-form-urlencoded',
			  'Content-Length': Buffer.byteLength(postData)
      }
    };

    var req = https.request(options,function(res){
      console.log(res.statusCode);
      if(res.statusCode == 200){
        res.on('data',function(data){
          var parsedData = JSON.parse(data.toString('utf8'));
          resolve(parsedData);
        });
      }else{
        res.on('data',function(data){
          reject({
            "Error":true,
            "message":data.toString('utf8')
          });
        });
      }
    });

    req.on('error',function(e){
      reject({
        "Error":true,
        "message":"Occurs an Error:"+e.message
      });
    });

    req.write(postData);
    req.end();
  }catch(e){
    console.log(e);
  }
}


module.exports = orderService;
