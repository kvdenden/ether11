import Web3 from 'web3';

const providerUri = "https://rinkeby.infura.io/" + process.env.INFURA_ACCESS_TOKEN;
const provider = new Web3.providers.HttpProvider(providerUri);

const web3 = new Web3(provider);

export default web3;
