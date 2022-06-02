const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config({ path: './config.env' })
const schema = require('./Services/GraphQL/schema')


const app = express()


app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}))


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))