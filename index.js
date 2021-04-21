const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express')
    .default


const app = express()


//loading type definitions from schema file
const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})

//loading resolvers
const resolvers = require('./resolvers')

//binding schema and resolver
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})


app.use(
    '/graphql',
    cors(), 
    bodyParser.json(),
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
        graphiql:true,
    }))
)

const port = 9000

app.get('/', expressPlayground({ endpoint: '/graphql' }))

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port || 5000 }/graphql`)
})
