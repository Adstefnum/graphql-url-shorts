const { client } = require("./db_files/connectdb.js");
const { GraphQLDateTime } = require('graphql-iso-date')
const { date } = require('./utils/date')
const { shortcode } = require('./utils/shortcode')


client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
});



const Date = {
Date : GraphQLDateTime,
}



const Link = {

   link_id:(root,args,context,info) => {
      return root.link_id
   },

   org_url:(root,args,context,info) => {
      return root.org_url
   },

   short_url:(root,args,context,info) => {
      return root.short_url
   },

   date_created:(root,args,context,info) => {
      return root.date_created
   },

   no_of_clicks:(root,args,context,info) => {
      return root.no_of_clicks
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
		var link_id = shortcode
        var short_url = "shorts-url.herokuapp.com/" + link_id
        var org_url = args.url
        var date_created = date
        var no_of_clicks  = 0
        console.log(link_id, short_url,org_url,no_of_clicks,date_created);

        const set_new_query = { 

        text:'INSERT into links VALUES ( $1,$2,$3,$4,$5)',
        values: [link_id, org_url,short_url,no_of_clicks,date_created]

    };

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

