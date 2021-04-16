var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://uzbzdjwu:YNlr45OJ8ze4s3r4URLvLtD36HD9kukg@queenie.db.elephantsql.com:5432/uzbzdjwu" //Can be found in the Details page
var client = new pg.Client(conString);

module.exports = {

  client:client
}
