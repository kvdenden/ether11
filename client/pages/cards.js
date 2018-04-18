import React, { Component } from 'react';
import web3 from '../lib/web3';
import getInjectedWeb3 from '../lib/injectedWeb3';
import getContract from '../lib/getContract'
import contractDefinition from '../lib/contracts/Card.json'
import Page from '../layouts/main'
import CardCollection from '../components/CardCollection'

class Cards extends Component {
  state = { balance: 0, cards: [] }

  async componentDidMount() {
    const contract = await getContract(web3, contractDefinition);
    console.log(await web3.eth.net.getId());

    try {
      const injectedWeb3 = await getInjectedWeb3();
      const accounts = await injectedWeb3.eth.getAccounts();

      const currentAccount = accounts[0];

      const balance = await contract.balanceOf(currentAccount).then(parseInt);
      const tokenIds = await Promise.all(
        Array(parseInt(balance))
          .fill()
          .map((_element, index) => {
            return contract.tokenOfOwnerByIndex(currentAccount, index);
          })
      );
      console.log(tokenIds);
      const cards = tokenIds.map(tokenId => ({ tokenId: parseInt(tokenId) }));
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
