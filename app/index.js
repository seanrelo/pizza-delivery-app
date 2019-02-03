/**
*  Primary File for run the API
*
*/

// Dependencies

var server = require('./lib/server');


// Declare the app
var app = {};

// Init function
app.init = function(){

  // run init function of server lib
  server.init();
};


// execute de init funcion of index
app.init();

// export the app
module.exports = app;
