import React, { Component } from 'react';
import web3 from '../lib/web3';
import getInjectedWeb3 from '../lib/injectedWeb3';
import getContract from '../lib/getContract'
import contractDefinition from '../lib/contracts/Cards.json'
import Page from '../layouts/main'
import CardCollection from '../components/CardCollection'
import getCardInfo from '../lib/getCardInfo'

class Cards extends Component {
  state = { balance: 0, cards: [] }

  async componentDidMount() {
    const contract = await getContract(web3, contractDefinition);

    try {
      const injectedWeb3 = await getInjectedWeb3();
      const accounts = await injectedWeb3.eth.getAccounts();

      const currentAccount = accounts[0];

      const balance = await contract.balanceOf(currentAccount).then(parseInt);

      const cards = await Promise.all(
        Array(balance)
          .fill()
          .map((_element, index) =>
            contract.tokenOfOwnerByIndex(currentAccount, index)
            .then(tokenId => Promise.all([tokenId, contract.getCardDetails(tokenId)]))
            .then(([tokenId, cardId]) => {
              return {
                tokenId: parseInt(tokenId),
                ...getCardInfo(parseInt(cardId))
              };
            })));

      this.setState({ currentAccount, balance, cards });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <Page>
        <h1>Cards</h1>
        <p>You have {this.state.balance} cards</p>
        <CardCollection cards={this.state.cards} />
      </Page>
    );
  }
}

export default Cards;
