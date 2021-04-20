const { client } = require('./connectdb.js')

/*var date_now = Date.now(); //this is for when I am inserting the value. I still need to convert it from epoch to normal date*/

const query = `CREATE TABLE links(
   link_id varchar(6) NOT NULL,
   org_url varchar(1000) NOT NULL,
   short_url varchar(40) NOT NULL,
   no_of_clicks INT NOT NULL,
   date_created DATE );
   `;

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(query, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    client.end();
    console.log('Table is successfully created');
  });
});