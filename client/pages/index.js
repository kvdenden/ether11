import React, { Component } from 'react';
import web3 from '../lib/web3';
import getContract from '../lib/getContract'
import contractDefinition from '../lib/contracts/Card.json'
import Link from 'next/link'
import Page from '../layouts/main'

class Index extends Component {

  static async getInitialProps() {
    const contract = await getContract(web3, contractDefinition);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    return { name, symbol, totalSupply: totalSupply.toString() }
  }


  render() {
    return (
      <Page>
        <h1>{this.props.name} - {this.props.symbol}</h1>
        <p>Total number of cards: {this.props.totalSupply}</p>
      </Page>
    );
  }
}

export default Index;
