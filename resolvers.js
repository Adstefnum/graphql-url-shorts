const { client } = require("./db_files/connectdb.js");
const { GraphQLDateTime } = require('graphql-iso-date')


client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});

const Date = {
Date : GraphQLDateTime,
}

const Link = {
   org_url:(root,args,context,info) => {
      return root.short_url
   }
}

const Query = {
    shortenURL: (args) => { 

    	client.query(`SELECT org_url FROM links;`, function(err, links) {
    if(err) {
      return console.error('Error retrieving links', err);
    }
    console.log(links['rows']);
    
if (args.url in links['rows']) {

    		//retrieve and return the ones in database
         client.query(` SELECT * FROM links WHERE org_url=${args.url};`, function(err, already_present_query) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('Link already exists and is retrieved from database');
  });

return already_present_query['rows'];

    	
}

else {
	//Sets the database values and return values
		var link_id = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5); 
        var short_url = "shorts-url.herokuapp.com/" + link_id
        var org_url = args.url
        var date_created = Date.now
        var no_of_clicks  = 0

        const set_new_query = ` INSERT into links
        VALUES ( ${link_id}, ${short_url},${org_url},${date_created},${no_of_clicks});
   `;

//inputs the values in the database

   client.query(set_new_query, function(err, set_new_result) {
    if(err) {
      return console.error('error running query', err);
    }
     client.end();
    console.log('Link is successfully shortened');
    return set_new_result['rows'];
  });

  

}
  });

    	
    }
 
}

module.exports = {Query, Date,Link}

