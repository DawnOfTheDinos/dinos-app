import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.0", settings: {} }],
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
  }
};
export default config;