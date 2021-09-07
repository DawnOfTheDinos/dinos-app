import { ethers } from 'ethers';
export default class DinoWeb3 {
  constructor() {
    this.web3 = new ethers.providers.Web3Provider(window.ethereum);
    // this.formatUnits = formatUnits().bind(this);
  }

  // Foramt
   formatUnits = async (value, formatTo) => {
    return ethers.utils.formatUnits(value, formatTo);
  };
   parseUnits = async (value, formatTo) => {
    return ethers.utils.parseUnits(value, formatTo);
  };
  //Get Nonce
   getNonce = async (address) => {
    try {
      const nonce = await this.web3.getTransactionCount(address, 'latest');
      console.log('The latest nonce is ' + nonce);
      return await nonce;
    } catch (error) {
      throw error;
    }
  };
  // Get Network
  static getNetwork = async (name_or_id) => {
    try {
      const network = await this.web3.getNetwork(name_or_id);
      console.log('The network is: ' + JSON.stringify(network));
      return await JSON.stringify(network);
    } catch (error) {
      throw error;
    }
  };
  // Get Balance of Address in BigNumber
   getAddress = async () => {
     this.web3.provider.request({ method: 'eth_requestAccounts' });
    const signer =  this.web3.getSigner();
    return await signer.getAddress();
  };

  // Get Balance of Address in BigNumber
   getBalance = async (address) => {
    return await this.web3.getBalance(address);
  };
  //
  //
  static getGasPrice = async () => await this.web3.getGasPrice();
  //

  static signTransaction = async (transaction) => {
    const signedTx = await web3.eth.accounts.signTransaction(transaction);
    return signedTx;
  };

  static sendTransaction = async (transaction) => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page

    await this.web3.sendTransaction(transaction, function (error, hash) {
      if (!error) {
        console.log(
          '🎉 The hash of your transaction is: ',
          hash,
          "\n Check Alchemy's Mempool to view the status of your transaction!"
        );
      } else {
        console.log(
          '❗Something went wrong while submitting your transaction:',
          error
        );
      }
    });
  };

  mint = async (address, amount) => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // The Metamask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    if (this.web3 !== undefined) {
      const signer = await this.web3.getSigner();
      // console.log('signer', signer);
      var abi = require('../artifacts/contracts/Dinos.sol/DawnOfTheDinos.json');
      var contract = await new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi.abi,
        this.web3
      );
      var contractSign = await contract.connect(signer);
      var gas = await this.web3.getGasPrice();
      var data = await contractSign.mint(
        amount
      );
      const tx = {
        from: address,
        to: process.env.CONTRACT_ADDRESS,
        gas: gas,
        maxPriorityFeePerGas: 1999999987,
        data: data,
      };
      const _tx = await this.sendTransaction(tx);
      return _tx;
    } else {
      console.log('Web3 is not defined');
    }
  };

  getNFTs = async (addr) => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // The Metamask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    if (this.web3 !== undefined) {
      const signer = this.web3.getSigner();
      var abi = require('../artifacts/contracts/Dinos.sol/DawnOfTheDinos.json');
      var contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        abi.abi,
        this.web3
      );
      var contractSign = await contract.connect(signer);
      return await contractSign
        .tokensOfOwner(addr)
        .then(async (res) => {
          return await res.map(async ({ _hex }) => {
            const _id = parseInt(Number(_hex), 10);
            const uri = await contractSign.tokenURI(parseInt(Number(_hex), 10));
            return { tokenID: _id, _uri: uri };
          });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return [];
    }
  };
  getPrice = async () => {
    if (this.web3 !== undefined) {
      const signer = this.web3.getSigner();
      var abi = require('../artifacts/contracts/Dinos.sol/DawnOfTheDinos.json');
      var contract = new ethers.Contract(
        contractAddr,
        abi.abi,
        this.web3
      );
      var contractSign = await contract.connect(signer);
      var data = await contractSign.getPrice();
      return data;
    } else {
      throw new Error('Web3 is not defined');
    }
  }
  setBaseURI = async (contractAddr, uri) => {
    if (this.web3 !== undefined) {
      const signer = this.web3.getSigner();
      var abi = require('../artifacts/contracts/Dinos.sol/DawnOfTheDinos.json');
      var contract = new ethers.Contract(
        contractAddr,
        abi.abi,
        this.web3
      );
      var contractSign = await contract.connect(signer);
      var gas = await this.web3.getGasPrice();
      var data = await contractSign.setBaseURI(
        uri
      );
      const tx = {
        from: address,
        to: contractAddr,
        gas: gas,
        maxPriorityFeePerGas: 1999999987,
        data: data,
      };
      const _tx = await this.sendTransaction(tx);
      return _tx;
    } else {
      throw new Error('Web3 is not defined');
    }
  }
}
