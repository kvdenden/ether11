import Web3 from 'web3';

const providerUri = process.env.PROVIDER_URI || `http://localhost:9545`;
const provider = new Web3.providers.HttpProvider(providerUri);

const web3 = new Web3(provider);

export default web3;
