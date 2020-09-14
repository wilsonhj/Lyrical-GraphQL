const express = require('express');
const models = require('./models');
// const expressGraphQL = require('express-graphql'); // deprecated
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// private key = '0c3e79a7-1a01-4cb7-ac02-1c9d89458d9d'

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://hjw:glxIPvUkTyytKjlJ@lyrical-cluster.qolbq.mongodb.net/lyrical-cluster?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
  })
);

// app.use('/graphql', expressGraphQL({ // deprecated
//   schema,
//   graphiql: true
// }));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
