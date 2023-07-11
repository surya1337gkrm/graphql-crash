# 02. Schema & Types

While creating the graphql server, we need to pass type definitions and resolver functions to ApolloServer fn.

**TypeDefs** : are definitions of different types of data that we want expose in our graph. [ Data inside graphql backend will be stored as graphs ]. This data will be made available on the graph which eventually end user can query.

Combination of all these types and relationship to all types and combination of queries can be made collectively called **Schema**.

Create a file **schema.js** where we store our schema/typeDefs. Schema will be stored a s single string with a specific format [ **starts with #graphql followed by type definitions** ]. Export the typeDefs from schema.js file as we need to add this in ApolloServer fn.

:warning: By default syntax will not be highlighted as schema/typeDefs is a string. Install _GraphQL syntax highlighter_ vs-code extension to highlight the type definitions syntax.

### Types

GraphQL supports 5 base types.

- `Int` to store whole numbers
- `Float` to store double values
- `Boolean` to store true/false
- `String` to store strings
- Special type called `ID` that graphql uses as a key for data objects.

In order to define schema and types, declare a variable and export it from schema.js. typeDefs is a string that starts with **#graphql** followed by type definitions as follows.

    export  const  typeDefs=`#graphql
    						 type  Game{
    								 id:ID!
    								 name:String!
    								 platform:[String!]!
    								 }
    						 type  Review{
    								 id:ID!
    								 rating:Int!
    								 content:String!
    								 }
    						 type  Query{
    							games:[Game]
    							reviews:[Review]
    							authors:[Author]
    							}`

We have two types in the above schema and a special **Query type**. In each object, type definition we need to add id property. If `!` isn't added, that means property isn't required. if we want a property to be mandatory then add `!` to the data type.

Simillarly, if the property should have array of strings, we need to enclose String within `[ ]` and we need to add ! for both String and after the brackets.

[String]! means property can still take _Array of null's_. If null isn't permitted, we need to define the property as `[String!]!`.

**Query** is a special type that should be **mandatory** in every schema we define in graphQL. It's job is to **define the entry points to the graph that speicifies the return types of those entry points**.

#### Example

If a user wants to query to fetch the list of reviews, we should define an entry point to return list of reviews (of type Review as we defined in the type definitions ).

    type Query{
    		reviews: [Review]
    		}

In the above example, an entry point `reviews` is created. When a user queries for reviews entry point, List of Review objects will be returned as the response. At the moment only Review type is exposed to the user.

:bangbang: A user who queried for reviews can fetch Review objects and related data in the graph i.e, if graph has a connection between Review and Author, Author details can be fetched but not other way around [ User cannot fetch Author details as there's no entry point for fetching Author details directly ]. **This Query type is like our way of gatekeeping to our graph and where user can jump into it initially.**

Adding other landing points.

    	type Query {
    				reviews: [Review]
    				games: [Game]
    				authors: [Author]
    			 }

After defining the schema, import typeDefs and add in the ApolloServer fn. This will provide information about the different types and entry points to the server.

**index.js**

    import { typeDefs } from  './schema.js';

    // Other code
    //server setup

    const { server } =  new  ApolloServer({
    								typeDefs,
    								//resolvers
    							});

Before running the server, we need to setup the resolvers and pass the resolvers to ApolloServer fn.