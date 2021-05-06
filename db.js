const { shortcode } = require('./utils/shortcode');
const { date } = require('./utils/date');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DATABASE,
	{dialect:'postgres'});

class Link extends Model { 

	get short_url() {
      return "https://shorts-url.herokuapp.com/" + this.short_link;
  }

	}
Link.init(
		{
			short_link: {
			    type: Sequelize.STRING,
			    allowNull: false,
			    defaultValue: shortcode,
			 		 },

			org_url : { 
				type: Sequelize.STRING,
				allowNull: false,
			},

    		no_of_clicks  : {
    			type: Sequelize.INTEGER,
    			allowNull: false,
			},

    		date_created: {
    		 type: Sequelize.DATE,
    		 allowNull: false,
    		 defaultValue:date,
			},

		},

		{
			sequelize, modelName:'link'
		});
//console.log(sequelize.authenticate())

module.exports =  sequelize;