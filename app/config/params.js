/**
*
* File for the initial params of the app
*
*/

// Params object
var params = {};

// Params of the Default environment
params.dev = {
  'port':3000,
  'envName': 'development',
  'hashingScreter': 'e0d123e5f316be',
  'stripe':{
    'hostname':'api.stripe.com',
    'path':'/v1/charges',
    'source':'tok_visa',
    'secret':'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
    'currency':'usd',
  },
  'mailGun':{
    "hostname":"api.mailgun.net",
    "path":"/v3/sandbox13ff1a84b6954c58a449d18ec13a093d.mailgun.org/messages",
    "from":"pizza@pizza_pirple.com",
    "key":"api:b78b8255ca8ed98acc2e8d3482470f6c-c8c889c9-f84c4ab4"
  }
};

// Params of the Production environment
params.production = {
  'port':5000,
  'envName': 'production',
  'hashingScreter': 'e0d123e5f316be',
  'stripe':{
    'hostname':'api.stripe.com',
    'path':'/v1/charges',
    'source':'tok_visa',
    'secret':'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
    'currency':'usd'
  },
  'mailGun':{
    "hostname":"api.mailgun.net",
    "path":"/v3/sandbox13ff1a84b6954c58a449d18ec13a093d.mailgun.org/messages",
    "from":"pizza@pizza_pirple.com",
    "key":"api:b78b8255ca8ed98acc2e8d3482470f6c-c8c889c9-f84c4ab4"
  }
};

// Function to get the params for a environment
var getParams = function(){
  var currentEvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase():'';
  var environmentToExpot = typeof(params[currentEvironment]) =='object' ? params[currentEvironment] : params.dev;
  return environmentToExpot;
}

module.exports = getParams();
