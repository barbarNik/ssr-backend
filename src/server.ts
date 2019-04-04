import * as Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import * as Users from "./data/users-data.json";

// Construct a schema, using GraphQL schema language

// Provide resolver functions for your schema fields

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => {
    // get the user token from the headers
    const token = ctx.req.headers.authorization || "";
    // try to retrieve a user with the token
    const user: any = Users.find((item: any) => item.jwt === token);

    return { user };
  },
  playground: {
    endpoint: "/graphql"
  },
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);