# 01. Introduction

We have few issues with Rest-API's.

- Over-Fetching
- Under-Fetching

#### Over-Fetching

When we request for data while using Rest-APIs, we will hit an endpoint and api will fetch data from the db and returns to the client which initiated the request. ut, we will get the entire data fetched from the data. There's a possibility that we will get the data which isn't used by the client. This is called **Over-Fetching**.

    Example: localhost:3000/api/users

    Returns a json response as follows:
    	{
    		users:[
    				{
    					id:1,
    					fname:'surya',
    					lname:'vijjana',
    					courses:[
    							{id:1337,name:'ai'},
    							{id:'1338',name:'acv'}
    						]
    					},
    				{
    					id:2,
    					fname:'Madhuri',
    					lname:'Jangiti',
    					courses:[
    							{id:1336,name:'se'},
    							{id:'1339',name:'ds'}
    						]
    					}
    				}
    			]
    	}

In our application, maybe we aren't using courses data. but, when sent a request to /users endpoint courses info will be fetched and will be sent as a response.

#### Under-Fetching

If we are sending a request to an endpoint and there's interlinked data, in order to get that data we should send another request to a seperate endpoint.

/users returns response as mentioned above. but if we need detailed information of each we might need to send a new request to /course endpoint. This is called as **Under Fetching**.

**GraphQL** will be helpful in both of these cases. GraphQL is a **Query Language** that helps us to build the backend to fetch specific data we need for our application based on the queries we send. GraphQL follows a query syntax which we will look into later.

## Installation

There are different libraries we can use to setup a graphql server/backend. **Apollo** is a popular js library that helps to create a graphql server.

- `npm init --y` and `npm pkg set type="module"` - Run these 2 commands to initiate a npm package and to use es6 modules in our package.
- Install @apollo/server and graphql packages using `npm i @apollo/server graphql` command from the terminal.

After installing the required packages, in index.js file, import ApolloServer and startStandaloneServer from @apollo/server library.

    import {ApolloServer} from '@apollo/server';
    import {startStandaloneServer} from '@apollo/server/standalone';

**ApolloServer** will be used to setup the server and configure the server and tell apollo how to handle different types of data and respond to the queries. Where as **startStandaloneServer** will be used to start the server and to listen to the incoming requests.

To create a graphql server, we need to follow the below steps.
	const {server} = new ApolloServer({
									//typeDefs
									//resolvers
								});
	const url = startStandaloneServer(server,
									  {listen:{port:4000});
									  
**ApolloServer** method takes an object as an input, which has typeDefs and resolvers.

- **typeDefs** (Type Definitions) : description of our data types and relation between other data types and different query landing points which can be used to fetch required data.
- **resolvers** : Resolver functions that determine how we respond to the queries.

**startStandaloneServer** takes 2 arguments. **server** which is created by ApolloServer in previous step and an object that has listen property which is an object that has **port address** on which we will listen to the incoming requests.

:warning: Unlike RestApis, graphql servers will have **only one endpoint** to which we will send our queries to fetch the data. And only **post** method can be used to get/update/post/delete data.
