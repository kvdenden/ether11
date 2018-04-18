import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import web3 from '../lib/web3';
import getInjectedWeb3 from '../lib/injectedWeb3';
import getContract from '../lib/getContract'
import contractDefinition from '../lib/contracts/Card.json'
import Link from 'next/link'
import Page from '../layouts/main'

class Admin extends Component {
  state = { currentAccount: undefined, isAdmin: false, address: '', tokenId: '' }

  async componentDidMount() {
    const contract = await getContract(web3, contractDefinition);

    try {
      const injectedWeb3 = await getInjectedWeb3();
      const accounts = await injectedWeb3.eth.getAccounts();
      const currentAccount = accounts[0];

      const owner = await contract.owner().then(web3.utils.toChecksumAddress);
      const isAdmin = owner === currentAccount
      console.log(owner)
      console.log(currentAccount)
      console.log("isAdmin", isAdmin)

      this.setState({ currentAccount, isAdmin });
    } catch (error) {
      console.log(error);
    }
  }

  onMint = async event => {
    event.preventDefault();

    const { currentAccount, address, tokenId } = this.state;
    try {
      const injectedWeb3 = await getInjectedWeb3();
      const contract = await getContract(injectedWeb3, contractDefinition);
      console.log("waiting to mint")
      await contract.mint(address, tokenId, {from: currentAccount});
      console.log("done minting")
    } catch (err) {
      console.log(err.message);
    }
  }

  // 0xaa1e846ba228375f44c2b6742f51e4b6b702ac0e

  render() {
    return (
      <Page>
        <h1>Admin interface</h1>
        { this.state.isAdmin ? '' : <div>You are not an admin!</div>}
        <hr />
        <h3>Create a new card</h3>
        <Form onSubmit={this.onMint}>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.address}
              onChange={event =>
                this.setState({ address: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Token id</label>
            <Input
              value={this.state.tokenId}
              onChange={event => this.setState({ tokenId: event.target.value })}
            />
          </Form.Field>
          <Button primary>
            Mint!
          </Button>
        </Form>
      </Page>
    );
  }
}

export default Admin;
