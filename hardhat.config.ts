import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';

const INFURA_URL = "INFURA ENDPOINT";
const PRIVATE_KEY = "PRIVATE KEY FROM THE WALLET THAT DEPLOYS THE CONTRACT";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.0", settings: {} }],
  },
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: "ETHERSCAN API KEY"
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  }
};
export default config;