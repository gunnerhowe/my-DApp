// src/myToken.js
import web3 from './web3';
import MyToken from './contracts/MyToken.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const instance = new web3.eth.Contract(
  MyToken.abi,
  contractAddress
);

export default instance;