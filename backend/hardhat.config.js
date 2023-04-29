require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('./tasks/task');

const ACCOUNT1 = process.env.ACCOUNT1;
const ACCOUNT2 = process.env.ACCOUNT2;

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: '0.8.18',
  networks: {
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [ACCOUNT2],
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    liberty: {
      url: 'https://liberty20.shardeum.org/',
      chainId: 8081,
      accounts: [ACCOUNT1],
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      chainId: 80001,
      accounts: [ACCOUNT1],
    },
    sepolia: {
      url: 'https://rpc.ankr.com/eth_sepolia',
      accounts: [ACCOUNT2],
    },
  },
};
