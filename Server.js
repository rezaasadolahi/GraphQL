const express = require('express')
require('dotenv').config({ path: './config.env' })
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Services/GraphQL/schema')


const app = express()


app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}))


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
