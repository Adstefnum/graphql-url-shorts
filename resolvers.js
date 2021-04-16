{ client } = require('../db_files/client');


    shortenURL: (args) => { 

    	if (args.url not in database) {
    	//Sets the database values and return values
        var short_url = "https://shorts-url.herokuapp.com/" + Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5); 
        var org_url = {args.url}
        var date_created = Date.now()
        var no_of_clicks  = 0

        const query = `( );
   `;

//inputs the values in the database
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(query, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    client.end();
    console.log('Link is successfully shortened');
  });
});
}

else {
	//retrieve and return the ones in database
}

        return short_url,org_url,date_created,no_of_clicks

    },
 
}

module.exports = {Query}

