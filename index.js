const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default

const schema = buildSchema(`
  type Query {
    hello(name: String!): String!
  }
`)

const resolvers = {
    hello: (args) => `Hello ${args.name}`,
}

const app = express()

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
         graphiql: true,
    }))
)

const port = 8080

app.get('/', expressPlayground({ endpoint: '/graphql' }))

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
})