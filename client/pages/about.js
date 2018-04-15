import React, { Component } from 'react';
import web3 from '../lib/web3';
import getInjectedWeb3 from '../lib/injectedWeb3';
import getContract from '../lib/getContract'
import contractDefinition from '../lib/contracts/Card.json'
import Link from 'next/link'
import Page from '../layouts/main'

class About extends Component {
  state = { balance: 'unknown' }

  static async getInitialProps() {
    const contract = await getContract(web3, contractDefinition);
    const accounts = await web3.eth.getAccounts();

    const name = await contract.name.call();
    const symbol = await contract.symbol.call();

    return { name, symbol }
  }

  async componentDidMount() {

    const injectedWeb3 = await getInjectedWeb3();
    console.log(injectedWeb3.currentProvider);
    console.log(await web3.eth.net.getId());
    console.log(await injectedWeb3.eth.net.getId());
    const contract = await getContract(injectedWeb3, contractDefinition);
    const accounts = await injectedWeb3.eth.getAccounts();

    const currentAccount = accounts[0];

    const balance = await contract.balanceOf(currentAccount);
    console.log(balance)
    this.setState({ balance: balance.toString() });
  }


  render() {
    return (
      <Page>
        <h1>{this.props.name} - {this.props.symbol}</h1>
        <p>You have {this.state.balance} cards!</p>
      </Page>
    );
  }
}

export default About;
