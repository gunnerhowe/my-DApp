// utils/myToken.js
import { web3Promise } from "./web3";
import MyToken from "./MyToken.json"; // Ensure the path is correct

const getContractInstance = async () => {
  const web3 = await web3Promise;
  if (!web3) {
    throw new Error("web3 is not initialized");
  }
  const contractAddress = "0x20D6b4932d552ad85727A19D1724A4cc46268cA3";
  return new web3.eth.Contract(MyToken.abi, contractAddress);
};

export default getContractInstance;
