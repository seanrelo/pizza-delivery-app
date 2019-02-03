/**
* File for the routes of the API
*
**/

// Dependencies
var user = require('../controllers/userController');
var token = require('../controllers/tokenController');
var menu = require('../controllers/menuController');
var cart = require('../controllers/cartController');
var order = require('../controllers/orderController');
// intantiate the routes object
routes = {
  'user':{
    'validMethod':['post','get','put','delete'],
    'controller': user
  },
  'token':{
    'validMethod':['post','delete'],
    'controller': token
  },
  'menu':{
    'validMethod':['get'],
    'controller':menu
  },
  'cart':{
    'validMethod':['post','get','put','delete'],
    'controller':cart
  },
  'order':{
    'validMethod':['post'],
    'controller': order
  }
};

routes.getController = function(data,callback){
  // Validate if the method of the request is valid
  try{
    if(routes[data.path].validMethod.indexOf(data.method) > -1){
      routes[data.path].controller.principal(data,callback);
    }else{
      callback(405);
    }
  }catch(e){
    console.log(e);
    callback(500,{'Error':'Could not execute the request'});
  }
};

// export the routes module
module.exports = routes;
