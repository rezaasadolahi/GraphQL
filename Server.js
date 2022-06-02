const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('dotenv').config({ path: './config.env' })
const schema = require('./Services/GraphQL/schema')
const MongoConnect = require('./Services/Database/connection')

const app = express()
MongoConnect()

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}))


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))