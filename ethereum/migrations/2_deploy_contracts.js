const Cards = artifacts.require('./Cards.sol')

module.exports = function (deployer) {
  deployer.deploy(Cards);
}
