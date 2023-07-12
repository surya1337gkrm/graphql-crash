# 04. Related Data
In GraphQL api's, we can query for a type and also query for the data related to the main query. For example, if game object schema has reviews then we can fetch the review data along with the game data.

To make this possible, we need to update the type definitions in the schema. 

**Updated Schema**

	type  Game{
		 id:ID!
		 name:String!
		 platform:[String!]!
		 reviews:[Review!] #added
		}
	type  Review{
		 id:ID!
		 rating:Int!
		 content:String!
		 game:Game! #added
		 author:Author! #added
		}
	type  Author{
		 id:ID!
		 name:String!
		 verified:Boolean!
		 reviews:[Review!] #added
		}
	
:bangbang: Each game object contains reviews. And we can have 0 reviews but if we have reviews for the game, they can't be null.

Similarly, Author object can have multiple reviews or 0 reviews but if there are reviews, they can't be null.

Each Review object is related to a single game and related to a single author. 

*After updating the schema, we need to add resolvers to fetch the related data*.

**Resolvers**
We shouldn't add the resolvers to fetch the related data in the Query resolver as only resolvers related to the entry points should be present in the Query.

Because this nested query request will be related to the main object type which we requested for, we will declare the object type inside the resolver object and attach an object to it which will have resolver functions.

For **Example**, if we would like to fetch reviews alomng with the game define the resolver fn for nested data as follows.

	const resolvers={
			....previous code
			
			Game:{
					reviews(parent){
							return db.reviews.filter(review=>review.game_id===parent.id)
						}
				}
		}

reviews() is a resolver fn which takes 3 parameters as every resolver function and parent will have information related to the parent query type. Here, parent will have specific game object we queried for with specific game id.

As Review type has two nested query possibilities [ game & author ], we need to define two resolvers as follows.

	Review: {
		game(parent) {
			return  db.games.find((game) =>  game.id  ===  parent.game_id);
		},
		author(parent) {
			return  db.authors.find((author) =>  author.id === parent.author_id);
		},
	}

Nowe we can do nested queries. 

**Query Example**

	query  ReviewQuery($id:ID!){
		game(id:$id){
			name
			platform
			reviews{
				rating
				content
				author{
					name
				}
			}
		}
	}

In the above example, we initiated a query to fetch a game with a specific id which returns a single game object and requesting for only name and platform properties in the game type. And, each game has a list of reviews. So there's a nested query to obtain reviews for this game and picking only rating and content of the each review of the game. For this nested query 01, Resolver defined for Game type will be invoked and reviews will be fetched.

And once the reviews are fetched, each review has an author and we have another nested query for the author. So, resolver defined in the Author will be invoked and author information will be fetched and as name is queried, name of the author will be included in the json response. 

**Response**

	{ "data":  { 
		"game":  { 
			"name":  "PubG",
			"platform": ["mobile","pc"],
			"reviews": [
				{
					"rating":  9,
					"content":  "lorem ipsum dolor sit amet",
					"author":  {
						"name":  "Rockstar"
						}
					}
				]
			}
		}
	}
	
	