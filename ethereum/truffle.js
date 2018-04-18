require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = process.env.HDWALLET_MNEMONIC;
var providerUri = "https://rinkeby.infura.io/" + process.env.INFURA_ACCESS_TOKEN;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, providerUri)
      },
      network_id: 4
    }
  }
};
