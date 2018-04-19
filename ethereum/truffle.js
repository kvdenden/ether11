var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: process.env.RPC_HOST || 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        var mnemonic = process.env.HDWALLET_MNEMONIC;
        var providerUri = "https://rinkeby.infura.io/" + process.env.INFURA_ACCESS_TOKEN;
        return new HDWalletProvider(mnemonic, providerUri)
      },
      network_id: 4
    }
  }
};
