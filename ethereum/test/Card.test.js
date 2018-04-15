const Card = artifacts.require('./Card.sol')

contract('Card', (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Card.deployed();
  });

  it('has a name', async () => {
    const name = await contract.name.call();
    assert.equal(name, 'Ether11 Card');
  });

  it('has a symbol', async () => {
    const symbol = await contract.symbol.call();
    assert.equal(symbol, 'E11');
  });
})
