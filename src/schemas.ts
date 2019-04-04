import { gql } from "apollo-server-koa";

const typeDefs = gql`

  type User{
    name:String,
    surname:String,
    username: String,
    avatar:String,
    jwt:String,
    id:String,
    role:String,
  }
  type Range{
    minimux: String,
    maximum: String,
  }
  type Pokemon{
    id: String,
    number: String,
    name: String,
    weight: Range,
    height: Range,
    types: [String]
    image:String,
  }
  type Query{
    getPokemons:[Pokemon],
    getPokedex:[Pokemon],
    getAdminPokedex:[Pokemon],
    currentUser:User
  }
  type Mutation{
    SignIn(username:String!,password:String!): User
  }
`;

export default typeDefs;
