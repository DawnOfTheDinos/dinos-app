// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// TODO breeding contract
// TODO comet shards contract
// TODO unit tests, cleanup
// TODO ipfs provenance hash (?)
contract DawnOfTheDinos is ERC721, ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    string private _baseTokenURI;
    uint private _price;
    uint private _herd; // for giveaways
    bool private _paused;

    address king = 0xD7E4A8E47f9645A0a7594a343Ff13859EFE7FcC1;
    address larienne = 0xf3644FeD397f1531833d23166cC3B82c90CaacA6;
    address suesanne = 0x5e4165149c77BcE857585789daFDf6F54Bc34650;
    address moikapy = 0xa8D145Dd3003817dA1DC83F838Ee5088B65Acf2e;
    address tai = 0xf59BACCBAcFA9c87970A6cCd52aF8DfDF87dFf1c;
    address lukas = 0x00Ec891371BBD69d4cc75F6a55DcD9792a6f0Be6;
    address jenk = 0x262456d9a98537f4706324666B28Bfa4E9D23446;
    address etra = 0x67B70Cd9E2926f901F55AC2D34d0652Be975cD4e;
    address elmnt = 0x1ddaB7A7E4F1c7A75a6B704C9D26cf7Bb294a67d;

    constructor(string memory baseURI) ERC721("Dawn of the Dinos", "DOTD") {
        setBaseURI(baseURI);

        // 1 Dino for each team member.
        _safeMint(elmnt, 0);
        _safeMint(jenk, 1);
        _safeMint(etra, 2);
        _safeMint(tai, 3);
        _safeMint(lukas, 4);
        _safeMint(moikapy, 5);
        _safeMint(larienne, 6);
        _safeMint(suesanne, 7);
        _safeMint(king, 8);

        _price = 0.065 ether;
        _herd = 200;
        _paused = true;
    }

    function mint(uint8 _amount) public payable {
        uint256 supply = totalSupply();
        require(!_paused, "Minting is paused!");
        require(_amount < 21, "20 Dinos max!");
        require(supply + _amount < 10000 - _herd, "Supply exceeded!"); // 200 for giveaways and airdrops
        require(msg.value >= _price * _amount, "Insufficient ETH!");

        for (uint256 i; i < _amount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function mintTo(address _to, uint256 _amount) external onlyOwner() {
        require( _amount <= _herd, "Herd is too small!" );

        uint256 supply = totalSupply();
        for(uint256 i; i < _amount; i++){
            _safeMint( _to, supply + i );
        }

        _herd -= _amount;
    }

    function pause(bool _value) public onlyOwner {
        _paused = _value;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    // TODO decide final %
    function withdrawBalance() public payable onlyOwner {
        require(address(this).balance > 0);
        require(payable(king).send(address(this).balance.div(100))); // 1%

        uint256 balance = address(this).balance;
        payable(larienne).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(suesanne).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(moikapy).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(tai).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(lukas).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(jenk).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(etra).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(elmnt).transfer(address(this).balance); // >= 12.5% (1/8th)
    }

    function walletOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
