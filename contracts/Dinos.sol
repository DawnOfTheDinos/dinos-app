// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// TODO breeding contract
// TODO comet shards contract
// TODO Uncomment the ether part in the mint function, since it is disabled for testing
// TODO ipfs provenance hash (?)
// TODO decide final %
contract DawnOfTheDinos is ERC721, ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    string private _baseTokenURI;
    uint private _price;
    uint private _reserved; // for giveaways
    bool private _paused;

    address[9] founders;
    

    constructor(string memory baseURI) ERC721("Dawn of the Dinos", "DOTD") {
        setBaseURI(baseURI);

        founders = [    
            0x0401d74a191300EE85FF3C5179Ff1f7Dd151d19B, // ceylon
            0xf3644FeD397f1531833d23166cC3B82c90CaacA6, // larienne
            0x5e4165149c77BcE857585789daFDf6F54Bc34650, // suesanne
            0xa8D145Dd3003817dA1DC83F838Ee5088B65Acf2e, // moikapy
            0xf59BACCBAcFA9c87970A6cCd52aF8DfDF87dFf1c, // tai
            0x00Ec891371BBD69d4cc75F6a55DcD9792a6f0Be6, // lukas
            0x262456d9a98537f4706324666B28Bfa4E9D23446, // jenk
            0x67B70Cd9E2926f901F55AC2D34d0652Be975cD4e, // etra
            0x1ddaB7A7E4F1c7A75a6B704C9D26cf7Bb294a67d  // elmnt
        ];

        for (uint i = 0; i < 9; i++) {
            _safeMint(founders[i], i);
        }

        _price = 0.065 ether;
        _reserved = 200;
        _paused = true;
    }

    function mint(uint8 _amount) public payable {
        uint256 supply = totalSupply();
        require(!_paused, "Minting is paused!");
        require(_amount < 21, "20 Dinos max!");
        require(supply + _amount < 10000 - _reserved, "Supply exceeded!"); // 200 for giveaways and airdrops
        //require(msg.value >= _price * _amount, "Insufficient ETH!");

        for (uint256 i; i < _amount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function mintTo(address _to, uint256 _amount) external onlyOwner() {
        require( _amount <= _reserved, "Herd is too small!" );

        uint256 supply = totalSupply();
        for(uint256 i; i < _amount; i++){
            _safeMint( _to, supply + i );   
        }

        _reserved -= _amount;
    }

    function pause(bool _value) public onlyOwner {
        _paused = _value;
    }

    function getPrice() public view returns (uint256) {
        return _price;
    }

    function withdrawBalance() public payable onlyOwner {
        require(address(this).balance > 0);        
        payable(founders[0]).transfer(address(this).balance.div(100)); // 1%
        uint256 balance = address(this).balance;
        payable(founders[1]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[2]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[3]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[4]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[5]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[6]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[7]).transfer(balance.mul(125).div(1000)); // 12.5% (1/8th)
        payable(founders[8]).transfer(address(this).balance); // >= 12.5% (1/8th)
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
