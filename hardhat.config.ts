import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-deploy';

import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';

dotenv.config();

const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID, ETHERSCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.0", settings: {} }],
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 4,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  },  
  namedAccounts: {
    deployer: 0,
  },
};
export default config;