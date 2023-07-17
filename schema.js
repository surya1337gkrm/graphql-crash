export const typeDefs = `#graphql

type Game{
    id:ID!
    name:String!
    platform:[String!]!
    reviews:[Review!]
}
type Review{
    id:ID!
    rating:Int!
    content:String!
    game:Game!
    author:Author!
}
type Author{
    id:ID!
    name:String!
    verified:Boolean!
    reviews:[Review!]
}
type Query{
    games:[Game]
    game(id:ID!): Game
    reviews:[Review]
    review(id:ID!): Review
    authors:[Author]
    author(id:ID!):Author
}
type Mutation{
    deleteGame(id:ID!):[Game]
    addGame(game:gameInput!):[Game]
    updateGame(id:ID!,edits:editsInput!):Game
}
input gameInput{
    name:String!
    platform:[String!]!
}
input editsInput{
    name:String,
    platform:[String!]
}`;
