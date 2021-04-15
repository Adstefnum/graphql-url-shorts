const { client } = require('./connectdb.js')

var date_now = Date.now();

console.log(date_now);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(`CREATE TABLE IF NOT EXISTS links(
  _id INT primary key serial,
   org_url varchar(1000) NOT NULL,
   short_url varchar(40) NOT NULL,
   no_of_clicks INT NOT NULL,
   date_created DATE DEFAULT 
   )
   ;
   `, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    client.end();
    console.log(result);
  });
});