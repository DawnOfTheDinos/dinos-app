async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);

    const DawnOfTheDinosFactory = await ethers.getContractFactory('DawnOfTheDinos');
    const DawnOfTheDinos = await DawnOfTheDinosFactory.deploy();
    console.log(`Token address: ${DawnOfTheDinos.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
});