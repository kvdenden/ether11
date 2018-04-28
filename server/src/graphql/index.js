import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { typeDefs as cardContractTypeDefs, resolvers as cardContractResolvers } from './cardContract';
import { typeDefs as cardTypeDefs, resolvers as cardResolvers } from './card';

const typeDefs = mergeTypes([
    cardContractTypeDefs,
    cardTypeDefs
  ]);

  const resolvers = mergeResolvers([
    cardContractResolvers,
    cardResolvers
  ]);

export { typeDefs, resolvers }
