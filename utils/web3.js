// utils/web3.js
import Web3 from "web3";

let web3;
let web3Promise;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and MetaMask is running.
  web3Promise = window.ethereum.request({ method: "eth_requestAccounts" })
    .then(() => {
      web3 = new Web3(window.ethereum);
      return web3;
    })
    .catch(err => {
      console.error("User denied account access:", err);
      return null;
    });
} else {
  // We are on the server *OR* the user is not running MetaMask
  const provider = new Web3.providers.HttpProvider(
    "https://eth-sepolia.g.alchemy.com/v2/HHU_B46gakwkr9N_eOdL6o5pFzW8P0z1"
  );
  web3 = new Web3(provider);
  web3Promise = Promise.resolve(web3);
}

export { web3, web3Promise };
