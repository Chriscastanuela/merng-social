const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const psub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, psub})
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connected');
        return server.listen({port: 3000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })