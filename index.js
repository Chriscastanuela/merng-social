const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post')
const User = require('./models/User')
const { MONGODB } = require('./config.js');


const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }catch(err) {
                throw new Error(err);
            }
        } 
    }
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