export const typeDefs = `#graphql

type Game{
    id:ID!
    name:String!
    platform:[String!]!
}
type Review{
    id:ID!
    rating:Int!
    content:String!
}
type Author{
    id:ID!
    name:String!
    verified:Boolean!
}
type Query{
    games:[Game]
    reviews:[Review]
    authors:[Author]
}`;
