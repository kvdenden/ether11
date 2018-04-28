import web3 from './web3';
import getContract from './getContract';
import contractDefinition from './contracts/Cards.json'

const cardContract = async () => await getContract(web3, contractDefinition);

export { cardContract }
