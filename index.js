//import { getrandom } from './shorten.js';

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default

const schema = buildSchema(`
  type Query {
    shortenURL(url: String!): String!
  }

`)

const resolvers = {
    shortenURL: (args) => { 
        return "https://shorts-url.herokuapp.com/" + Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5); 
    },
 
}

const app = express()

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
        graphiql:true,
    }))
)

const port = 8080

app.get('/', expressPlayground({ endpoint: '/graphql' }))

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
})
