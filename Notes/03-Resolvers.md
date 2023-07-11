# 03. Resolvers, Query Variables & GraphQL Server


### Resolvers
Resolvers are functions which allows to decide how we response to the queries to the graph. These functions will be responsible to fetch the data from the database and respond to the incoming queries.

:warning: in this application context, we aren't connecting to a database. Instead, we use a local file and store the necessary data that will be sent back to the user based on the queries.

To create resolvers, declare a variable named **resolvers** and store an object that will be hold each resolver function for each type we defined. To begin with, we have a special Query type for all query requests and we need to add resolver functions for types. [ :bangbang: all type and entrypoint names  should be macthed otherwise we will get an error ].

*Import the db file to return the data for the user queries*. 

Resolvers object will have Query property in which we will define our resolver functions. These functions are simillar to the controller functions we define in express.js application. When an incoming request hits the server, routes will be matched and associated controller function will be invoked. In GraphQL context, as we will be hitting a single endpoint, here based on the queries relevant resolver functions will be invoked.

:warning: Entry point names in schema and resolver function names should match.

	import db from './_db.js';
	
	const resolvers={
					  Query:{
							  games(){
								    return db.games();
								  }
						  }
						}

Now pass this resolvers to the ApolloServer fn as second argument.

	const server  =  new  ApolloServer({typeDefs,resolvers});

With the above setup, we can request for games as we don't have resolver functions for the other entry points. If we send a query for reviews entry points, we will recieve null as response.

When user requests for specific data of a type, we don;t need to handle filtering of the data as per user queries. When resolvers is added to ApolloServer, ApolloServer will do all necessary work to return the data user queried for. We just need to return the data source.

i.e, *if user queried for name and id of games to the games entry point, we just need to fetch the games data and return the data. platform data in the games object will be skipped in the response and this will be taken care of by ApolloServer package*.

### Testing Setup
In order to test our graphQL server, we can use Apollo Explorer which is simillar to postman but for graphQL servers.

- Install nodemon as dev dependency and run the server [ nodemon index.js ].
- Open Apollo Server explorer in browser and enter the url of the server [ localhost:4000 ].
- After server is loaded, we can find the available types in our application and we can initiate a query.

	**Apollo Explorer**
		
		query  ExampleQuery  {
			games{
				name
				},
			reviews{
				id,
				content
				}
			}
   Here we are querying for name of each game and id & content of each review. But as we didn't add the resolver function for reviews yet, in the response for reviews entrypoint, we will get null as response.
   
  **Response**
  
		"data":  {
				 "games": [
							   {
								   "name":  "PubG"
								},
							  {
								  "name":  "CoD"
							  },
							  {
							      "name":  "CoD:Ghosts"
							  }
						],
				"reviews":  null
			}
		}

## Query Variables
Simillar to how we query for a single resource i.e, fetching a single review/game/author details in express.js application using query params. In order to fetch a single object of a type, we need to define new entry points in the Query type of schema.

**Schema.js**
In Query type, add a new entry point as *game* which will be used to fetch the single game details based on the id provided. Add id parameter to the entrypoint as below and include the param type and add **!** if the parameter is mandatory.

	type  Query{
		games:[Game]
		game(id:ID!): Game
	}
Here, game entrypoint takes id as a parameter and returns Game object. After adding the entrypoint to the schema, we need to add a resolver function to fetch the data and return to the user queries.

**index.js**

	const  resolvers  = {
		Query: {
			games() {
				return  db.games;
				},
			game(parent, args, context) {
				return  db.games.find((game) =>  game.id  ===  args.id);
			}
		}
Resolver function has three arguments available. 
- **Parent** - Provide information related to the parent resolver in the resolver chain.
- **args** - provides arguments passed to the resolver function. This will be used to access the query variables.
- **context** - Object which we can use for supplying context information across all our resolvers such as authentication information etc..

As we have the query param id sent as part of the user query to the graph which can be accessed from args.id [ as in the entry point we named the param as id ], we can filter the data using this *id* and return the data. As discussed earlier, user query for specific properties of the object type will be handled by the ApolloServer.

To test the new endpoints we need to pass params as part of the query. In Apollo Explorer, we can define the params we want to pass to the query entry points as below.

- Add id variable and type and if mandatory add **!** next to the param type.
- In Apollo Explorer, in variables tab add variables and data in JSON Format. This data can be accessed by the query and will be passed to the entry point query.


		query  ExampleQuery($id:ID!)  {
				game(id:$id){
					name,
					platform
				}
			}
- If we want to query multiple entry points based on query variables, add multiple id variables to the Query in Apollo Explorer as below.
	
	**Query**
	
		query  ExampleQuery($id:ID!,$aid:ID!,$rid:ID!)  {
			game(id:$id){
				name,
				platform
				}
			author(id:$aid){
				name
			}
			review(id:$rid){
				content,
				rating
			}
		}

   **Variables** [ adding id's as JSON ]
   
		{
			"id":"1",
			"aid":"2",
			"rid":"3"
		}
