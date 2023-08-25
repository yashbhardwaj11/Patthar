// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error NotOwner(address);
error BidNotGreater(uint256);
error NotValidAddress();
error AmountNotEnough();

contract metNft is ERC721URIStorage{

    uint256 private tokenID;
    address private owner;
    mapping(address=>uint256) moneyDeposited;
    mapping(uint256=>uint256) currentBid;
    mapping(uint256=>address) highestBidder;
    mapping(uint256=>uint256) ceilingValue;

    event newBid(uint256 timeStamp, address bidder, uint256 tokenID,uint256 newValue);
    event newNFT(uint256 timeStamp, uint256 tokenID, string tokenURI);
    event auctionEnded(uint256 timeStamp, uint256 tokenID, address winner);

    constructor (string memory _name, string memory _symbol) ERC721(_name,_symbol){
        tokenID = 0;
        owner = msg.sender;
    }

    modifier isOwner{
        if(msg.sender==owner){
            revert NotOwner(msg.sender);
        }
        _;
    }

    modifier isValidAddress{
        if(msg.sender == address(0)){
            revert NotValidAddress();
        }
        _;
    }

    modifier isAboveCeiling(uint256 _tokenID){
        if(msg.value < ceilingValue[_tokenID]){
            revert AmountNotEnough();
        }
        _;
    }

    function mintMet(string memory _tokenURI) public isOwner{
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID,_tokenURI);
        emit newNFT(block.timestamp, tokenID, _tokenURI);
        tokenID++;
    }

    function placeBid(uint256 _tokenID) public payable isAboveCeiling(_tokenID){
        if(msg.value>currentBid[_tokenID]){
            revert BidNotGreater(msg.value);
        }
        if(highestBidder[_tokenID]!=address(0)){
            address prevBidder = highestBidder[_tokenID];
            refund(prevBidder);
        }
        currentBid[_tokenID] = msg.value;
        highestBidder[_tokenID] = msg.sender;
        moneyDeposited[msg.sender] = msg.value;
        emit newBid(block.timestamp, msg.sender, tokenID, msg.value);
    }

    function retrieveVal() public payable isOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }

    function refund(address user) public {
        if(moneyDeposited[user]==0){
            revert NotValidAddress();
        }
        uint256 value = moneyDeposited[user];
        moneyDeposited[user] = 0;
        payable(user).transfer(value);
    }

    function closeAuction(uint256 _tokenID) public isValidAddress{
        address hB = highestBidder[_tokenID];
        _transfer(owner,hB,_tokenID);
        retrieveVal();
        emit auctionEnded(block.timestamp, tokenID, hB);
    }

    function getCurrentBid(uint256 _tokenID) public view returns(uint256){
        return currentBid[_tokenID];
    }

    function getHightestBidder(uint256 _tokenID) public view returns(address){
        return highestBidder[_tokenID];
    }

    function setCeilingValue(uint256 _tokenID, uint256 ceiling) public {
        ceilingValue[_tokenID] = ceiling;
    }

    function getCeilingValue(uint256 _tokenID) public view returns(uint256){
        return ceilingValue[_tokenID];
    }
}