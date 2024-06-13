// pages/index.js
import { useState, useEffect } from "react";
import getContractInstance from "../utils/myToken";
import { web3Promise } from "../utils/web3";

const Home = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const web3 = await web3Promise;
        if (!web3) {
          console.error("web3 not initialized");
          return;
        }
        const accounts = await web3.eth.getAccounts();
        console.log("Accounts:", accounts);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.error("No accounts found");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    loadAccount();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      if (account) {
        try {
          const myToken = await getContractInstance();
          const balanceWei = await myToken.methods.balanceOf(account).call();
          console.log("Balance (wei):", balanceWei);
          const web3 = await web3Promise;
          const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
          console.log("Balance (ether):", balanceEther);
          setBalance(balanceEther);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };
    loadBalance();
  }, [account]);

  return (
    <div>
      <h1>MyToken DApp</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default Home;
