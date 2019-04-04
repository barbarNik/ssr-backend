import * as Pokemons from "./data/pokemon-data.json"
import * as Users from "./data/users-data.json";
import * as Pokedex from "./data/pokedex-data.json";
import * as AdminPokedex from "./data/admin-data.json";

import { AuthenticationError } from "apollo-server-koa";

const resolvers = {
  Query: {
    getPokemons: () => {
      return Pokemons
    },
    getPokedex: (parent: any, args: any, context: any): any => {
      if (!context.user) {
        throw  new AuthenticationError("not authorized")
      }
      if (context.user.role != "USER"){
        throw  new AuthenticationError("wrong role")
      }
        return Pokedex[context.user.username];
    },
    currentUser: (parent: any, args: any, context: any): any => {
      if (context.user) {
        return context.user
      }
      throw  new AuthenticationError("SignInFirst")
    },
    getAdminPokedex: (parent: any, args: any, context: any): any => {
      if (!context.user) {
        throw  new AuthenticationError("not authorized")
      }
      if (context.user.role != "ADMIN"){
        throw  new AuthenticationError("wrong role")
      }
      return AdminPokedex[context.user.username];
    },
  },
  Mutation: {
    SignIn: (parent: any, args: any): any => {
      const user: any = Users.find(
        item => item.username === args.username &&
          item.password == args.password
      );
      if (!user) {
        throw  new AuthenticationError("Wrong username or password")
      }
      return user;
    }
  }
};

export default resolvers;