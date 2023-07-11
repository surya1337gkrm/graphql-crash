import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(parent, args, context) {
      console.log(parent, args, context);
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => args.id === author.id);
    },
    reviews() {
      return db.reviews;
    },
    review(parent, args, context) {
      return db.reviews.find((review) => args.id === review.id);
    },
  },
};

//server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server Ready at :' + url);
