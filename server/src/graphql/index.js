import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { typeDefs as cardContractTypeDefs, resolvers as cardContractResolvers } from './cardContract';
import { typeDefs as cardInfoTypeDefs, resolvers as cardInfoResolvers } from './cardInfo';

const typeDefs = mergeTypes([
    cardContractTypeDefs,
    cardInfoTypeDefs
  ]);

  const resolvers = mergeResolvers([
    cardContractResolvers,
    cardInfoResolvers
  ]);

export { typeDefs, resolvers }
