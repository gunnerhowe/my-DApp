const MyToken = artifacts.require("MyToken");

async function deployWithRetry(deployer, contract, ...args) {
  let attempt = 0;
  const maxAttempts = 5;
  const delay = ms => new Promise(res => setTimeout(res, ms));

  while (attempt < maxAttempts) {
    try {
      await deployer.deploy(contract, ...args);
      console.log(`${contract.contractName} deployed successfully`);
      return;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxAttempts) {
        console.log(`Retrying in ${attempt * 2000} ms...`);
        await delay(attempt * 2000);
      } else {
        throw new Error(`Failed to deploy ${contract.contractName} after ${maxAttempts} attempts`);
      }
    }
  }
}

module.exports = async function(deployer) {
  const initialSupply = web3.utils.toWei('1000', 'ether');  // Example supply
  await deployWithRetry(deployer, MyToken, initialSupply);
};