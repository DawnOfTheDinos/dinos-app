const {expect} = require('chai');

describe('Dawn of the Dinos Contract', () => {
    let DawnOfTheDinosFactory, DawnOfTheDinos, owner, addr1, addr2;
    
    beforeEach(async () => {
        //Getting the contract
        DawnOfTheDinosFactory  = await ethers.getContractFactory('DawnOfTheDinos');
        //Deploying the contract
        DawnOfTheDinos = await DawnOfTheDinosFactory.deploy("https://google.com/");
        //Getting addresses
        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe('Deployment', async () => {
        it('should set the correct owner', async () => {
            expect(await DawnOfTheDinos.owner()).to.equal(owner.address);
        });
    });

    describe('Transactions', async () => {
        it('should mint one token to addr1', async () =>  {
            await DawnOfTheDinos.connect(owner).pause(false);
            await DawnOfTheDinos.connect(addr1).mint(1);
            expect(await DawnOfTheDinos.ownerOf(9)).to.equal(addr1.address);
        });

        it('should revert if sale is paused', async () =>  {
            await expect(DawnOfTheDinos.connect(addr1).mint(1)).to.be.revertedWith('Minting is paused!')
        });

        it('should revert if more then 20 are being minted', async () =>  {
            await DawnOfTheDinos.connect(owner).pause(false);
            await expect(DawnOfTheDinos.connect(addr1).mint(25)).to.be.revertedWith('20 Dinos max!')
        });

        it('should mint 15 tokens to addr2', async () =>  {
            await DawnOfTheDinos.connect(owner).pause(false);
            await DawnOfTheDinos.connect(addr2).mint(15);
            let tokens = await DawnOfTheDinos.walletOfOwner(addr2.address);
            let tokensSorted = []
            tokens.forEach((token) => {
                tokensSorted.push(token.toNumber());
            });
            expect(tokensSorted.length).to.equal(15);
        });
    });

    describe('Utility functions', async () => {
        it('should return the correct price', async () => {
            //0xe6ed27d6668000 is equal to 65000000000000000 or 0.65eth
            expect(await DawnOfTheDinos.getPrice()).to.equal(BigInt(0xe6ed27d6668000));
        });
    });
})