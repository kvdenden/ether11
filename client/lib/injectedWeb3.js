import Web3 from 'web3'

const resolveWeb3 = (resolve, reject) => {
  if (typeof window.web3 !== 'undefined') { // i.e. Mist/Metamask
    console.log(`Injected web3 detected.`);
    const web3 = new Web3(window.web3.currentProvider);
    resolve(web3);
  } else {
    reject(`Injected web3 not available, please install metamask`)
  }
}

export default () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener(`load`, () => {
      resolveWeb3(resolve, reject);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === `complete`) {
      resolveWeb3(resolve, reject);
    }
  });
