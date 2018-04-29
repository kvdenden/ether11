import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Page from '../layouts/main'
import withData from '../lib/apollo'

const getTotalSupply = gql`
  query getTotalSupply {
    cardContract {
      totalSupply
    }
  }
`;

class Index extends Component {
  render() {
    return (
      <Page>
        <h1>Ether 11</h1>
        <Query query={getTotalSupply}>
          {({ data }) => {
            const { cardContract } = data;
            return (
              <p>Total number of cards: {cardContract ? cardContract.totalSupply : 0}</p>
            );
          }}
        </Query>
      </Page>
    );
  }
}

export default withData(Index);
