import getCardInfo from '../lib/getCardInfo';

const typeDefs = `
  extend type Card {
    info: CardInfo
  }

  type CardInfo {
    name: String!
  }

  type Query {
    card(id: Int!): Card!
  }
`;

const resolvers = {
  Query: {
    card: (_, { id }) => {
      return { cardId: id };
    }
  },
  Card: {
    info: ({ cardId }) => {
      return getCardInfo(cardId);
    }
  },
};

export { typeDefs, resolvers };
