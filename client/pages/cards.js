import React, { Component } from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import getInjectedWeb3 from '../lib/injectedWeb3';
import Page from '../layouts/main'
import withData from '../lib/apollo'
import CardCollection from '../components/CardCollection'

const getTokens = gql`
  query getTokens($owner: Address!) {
    cardContract {
      balance: balanceOf(owner: $owner)
      tokens: tokensOf(owner: $owner) {
        tokenId
        ...CardCollectionFragment
      }
    }
  }
  ${CardCollection.fragments.entry}
`;

class Cards extends Component {
  state = { currentAccount: null }
  async componentDidMount() {
    try {
      const injectedWeb3 = await getInjectedWeb3();
      const accounts = await injectedWeb3.eth.getAccounts();
      const currentAccount = accounts[0];

      this.setState({ currentAccount });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <Page>
        <h1>Cards</h1>
        <Query query={getTokens} variables={{ owner: this.state.currentAccount }} skip={!this.state.currentAccount}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error {error.message}</p>
            }

            console.log(data);

            return (
              <div>
                <p>You have {data.cardContract.balance} cards.</p>
                <CardCollection tokens={data.cardContract.tokens} />
              </div>
            );
          }}

        </Query>
      </Page>
    );
  }
}

export default withData(Cards);
