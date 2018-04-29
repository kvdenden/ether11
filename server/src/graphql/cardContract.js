import { cardContract } from '../lib/contracts';

const typeDefs = `
  scalar Address

  interface ERC721Token {
    tokenId: Int!
    owner: Address
  }

  interface ERC721Contract {
    totalSupply: Int!
    balanceOf(owner: Address!): Int!
    tokensOf(owner: Address!): [ERC721Token!]!
  }

  type Card {
    cardId: Int!
  }

  type CardToken implements ERC721Token {
    tokenId: Int!
    owner: Address!
    card: Card!
  }

  type CardContract implements ERC721Contract {
    totalSupply: Int!
    balanceOf(owner: Address!): Int!
    tokensOf(owner: Address!): [CardToken!]!
    token(id: Int!): CardToken
  }

  type Query {
    cardContract: CardContract
  }
`;

const resolvers = {
  ERC721Contract: {
    __resolveType(_obj) {
      return "CardContract";
    }
  },
  ERC721Token: {
    __resolveType(_obj) {
      return "CardToken";
    }
  },
  Query: {
    cardContract: async () => {
      const contract = await cardContract();
      return contract;
    }
  },
  CardContract: {
    totalSupply: async (contract) => {
      return await contract.totalSupply();
    },
    balanceOf: async (contract, { owner }) => {
      return await contract.balanceOf(owner);
    },
    tokensOf: async (contract, { owner }) => {
      const balance = await contract.balanceOf(owner).then(parseInt);

      const tokens = await Promise.all(
        Array(balance).fill().map((_element, index) => contract.tokenOfOwnerByIndex(owner, index).then(parseInt))
      );
      return tokens.map((tokenId) => ({ tokenId, contract }));
    },
    token: async (contract, { id }) => {
      const tokenExists = await contract.exists(id);
      if (tokenExists) {
        return { tokenId: id, contract };
      }
    }
  },
  CardToken: {
    owner: async ({ tokenId, contract }) => {
      return await contract.ownerOf(tokenId);
    },
    card: async ({ tokenId, contract }) => {
      const cardId = await contract.getCard(tokenId).then(parseInt);
      return { cardId };
    }
  }
};

export { typeDefs, resolvers };
