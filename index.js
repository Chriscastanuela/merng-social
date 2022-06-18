const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const User = require('./models/User');
const { MONGODB } = require('./config.js');


const resolvers = {

}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('Mongo connected');
        return server.listen({port: 3000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })