import initContract from 'truffle-contract'

const getContract = async (web3, contractDefinition) => {
  const contract = initContract(contractDefinition)
  contract.setProvider(web3.currentProvider)

  const instance = await contract.deployed()
  return instance
}

export default getContract
