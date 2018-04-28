const typeDefs = `
  type Card {
    cardId: Int!
  }

  type Query {
    card(id: ID!): Card
  }
`;

const resolvers = {
  Query: {
    card: (_, { id }) => {
      return {
        cardId: parseInt(id)
      };
    }
  }
};

export { typeDefs, resolvers };
