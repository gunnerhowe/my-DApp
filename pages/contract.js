import Web3 from 'web3';
import MyToken from './contracts/MyToken.json';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', () => {
      let web3 = window.ethereum ? new Web3(window.ethereum) : new Web3(window.web3.currentProvider);
      if (window.ethereum) {
        try {
          window.ethereum.enable().then(() => {
            resolve(web3);
          });
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(web3);
      }
    });
  });

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = MyToken.networks[networkId];
  return new web3.eth.Contract(
    MyToken.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export { getWeb3, getContract };