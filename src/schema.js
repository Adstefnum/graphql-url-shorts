const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const { GraphQLDate } = require('graphql-iso-date')
const {Db} = require('../db');
const { shortcode } = require('../utils/shortcode');
const { date } = require('../utils/date');

const Link = new GraphQLObjectType({
  name: 'Link',
  description: 'Links',
  fields () {
    return {
      short_link: {
        type: GraphQLString,
        defaultValue:shortcode,
        resolve (link) {
          return link.short_link;
        }
      },
      org_url: {
        type: GraphQLString,
        resolve (link) {
          return link.org_url;
        }
      },
      no_of_clicks: {
        type: GraphQLInt,
        defaultValue:0,
        resolve (link) {
          return link.no_of_clicks;
        }
      },
      date_created: {
        type: GraphQLDate,
        defaultValue:date,
        resolve (link) {
          return link.date_created;
        }
      },
    };
  }
});


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      retrieveURL: {
        type: new GraphQLList(Link),
        args: {
          org_url: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.link.findAll({ where: args });
        }
      },
    };
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields () {
    return {
      shortenURL: {
        type: Link,
        args: {
          short_link: {
            type: GraphQLNonNull(GraphQLString),
            defaultValue:shortcode,
          },
          org_url: {
            type: GraphQLNonNull(GraphQLString)
          },
          no_of_clicks: {
            type: GraphQLNonNull(GraphQLInt),
            defaultValue:0,
          },
          date_created: {
            type: GraphQLDate,
            defaultValue:date,
          }
      },
        resolve (source, args) {
          return Db.models.link.create({
            short_link: args.short_link,
            org_url: args.org_url,
            no_of_clicks: args.no_of_clicks,
            date_created: args.date_created
          });
        }
     },
    };
  }
});



const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = { Schema };