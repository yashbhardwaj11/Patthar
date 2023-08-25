// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./IERC20.sol";

error NotOwner(address);
error BidNotGreater(uint256);
error NotValidAddress();
error ApprovalAmountMismatch();
error TypeInvalid();
error InvalidTokenId();
error InvalidClosingTime();
error AuctionClosed();

contract Patthar is ERC721URIStorage {
    uint256 private tokenId;
    address private owner;
    IERC20 private erc20Address;

    // 1 for Meteorite, 2 for Debris
    mapping(uint256 => uint8) nftType;

    mapping(uint256 => mapping(address => uint256)) currentBid;
    mapping(uint256 => address) highestBidder;
    mapping(uint256 => uint256) highestBid;
    mapping(uint256 => uint256) floorValue;
    mapping(uint256 => uint256) closingTimestamp;
    mapping(uint256 => bool) bidConcluded;

    // To make sure the first time someone is buying the nft they are dealing with the right values for the price.
    mapping(uint256 => bool) tradingBegun;

    event NewBid(
        uint256 timestamp,
        address bidder,
        uint256 tokenId,
        uint256 newValue
    );
    event AuctionEnded(uint256 timestamp, uint256 tokenId, address winner);
    event MeteoriteAdded(
        uint256 timestamp,
        uint256 closingTimestamp,
        uint256 tokenId
    );
    event DebrisAdded(
        uint256 timestamp,
        uint256 closingTimestamp,
        uint256 tokenId
    );
    event ClosingTimestampUpdated(uint256 tokenId, uint256 updatedTimestamp);

    constructor(
        string memory _name,
        string memory _symbol,
        address _erc20Address
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
        erc20Address = IERC20(_erc20Address);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner(msg.sender);
        }
        _;
    }

    modifier validTokenId(uint256 _tokenId) {
        if (_tokenId >= tokenId) revert InvalidTokenId();
        _;
    }

    modifier openForAuction(uint256 _tokenId) {
        if (block.timestamp >= closingTimestamp[_tokenId])
            revert AuctionClosed();
        _;
    }

    function mintToken(
        string memory _tokenURI,
        uint8 _type,
        uint256 _closingTimestamp
    ) external onlyOwner {
        if (_type != 1 || _type != 2) revert TypeInvalid();
        if (_closingTimestamp <= block.timestamp) revert InvalidClosingTime();

        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        closingTimestamp[tokenId] = _closingTimestamp;
        nftType[tokenId] = _type;

        if (_type == 1) {
            emit MeteoriteAdded(block.timestamp, _closingTimestamp, tokenId);
        } else emit DebrisAdded(block.timestamp, _closingTimestamp, tokenId);

        tokenId++;
    }

    function placeBid(
        uint256 _amount,
        uint256 _tokenId
    ) external validTokenId(_tokenId) openForAuction(tokenId) {
        uint256 approvedAmount = erc20Address.allowance(
            msg.sender,
            address(this)
        );
        if (approvedAmount != _amount) revert ApprovalAmountMismatch();

        if (!tradingBegun[_tokenId]) {
            if (_amount < floorValue[_tokenId]) revert BidNotGreater(_amount);

            erc20Address.transferFrom(msg.sender, address(this), _amount);

            tradingBegun[_tokenId] = true;
            highestBidder[_tokenId] = msg.sender;
            highestBid[_tokenId] = _amount;
            currentBid[_tokenId][msg.sender] = _amount;

            emit NewBid(block.timestamp, msg.sender, tokenId, _amount);
        } else {
            if (_amount < highestBid[_tokenId]) revert BidNotGreater(_amount);

            erc20Address.transferFrom(msg.sender, address(this), _amount);

            address prevBidder = highestBidder[_tokenId];
            refund(_tokenId, prevBidder);

            highestBidder[_tokenId] = msg.sender;
            highestBid[_tokenId] = _amount;
            currentBid[_tokenId][msg.sender] = _amount;

            emit NewBid(block.timestamp, msg.sender, tokenId, _amount);
        }
    }

    function concludeBid(uint256 _tokenId) external {
        if (
            !bidConcluded[_tokenId] &&
            tradingBegun[_tokenId] &&
            closingTimestamp[tokenId] <= block.timestamp
        ) {
            bidConcluded[_tokenId] = true;

            address hB = highestBidder[_tokenId];
            _transfer(owner, hB, _tokenId);
            retrieveVal();
            emit AuctionEnded(block.timestamp, tokenId, hB);
        }
    }

    /// Getter functions.

    function getUserBid(uint256 _tokenId) external view returns (uint256) {
        return currentBid[_tokenId][msg.sender];
    }

    function getHighestBid(uint256 _tokenId) external view returns (uint256) {
        return highestBid[_tokenId];
    }

    function getHightestBidder(
        uint256 _tokenId
    ) external view returns (address) {
        return highestBidder[_tokenId];
    }

    function getFloorValue(uint256 _tokenId) external view returns (uint256) {
        return floorValue[_tokenId];
    }

    function getType(uint256 _tokenId) external view returns (uint8) {
        return nftType[_tokenId];
    }

    function getClosingTimestamp(
        uint256 _tokenId
    ) external view returns (uint256) {
        return closingTimestamp[_tokenId];
    }

    function getCurrentTokenId() external returns (uint256) {
        return tokenId;
    }

    /// Internal Functions
    function retrieveVal() internal {
        uint256 balance = erc20Address.balanceOf(address(this));
        erc20Address.transfer(owner, balance);
    }

    function refund(uint256 _tokenId, address _user) internal {
        if (currentBid[_tokenId][_user] != 0) {
            uint256 toReturn = currentBid[_tokenId][_user];
            currentBid[_tokenId][_user] = 0;

            erc20Address.transfer(_user, toReturn);
        }
    }

    /// Admin Functions

    function updateClosingTime(
        uint256 _tokenId,
        uint256 _updatedClosingTimestamp
    ) external onlyOwner {
        if (!tradingBegun[_tokenId]) {
            if (_updatedClosingTimestamp <= block.timestamp)
                revert InvalidClosingTime();
            closingTimestamp[_tokenId] = _updatedClosingTimestamp;

            emit ClosingTimestampUpdated(_tokenId, _updatedClosingTimestamp);
        }
    }

    function updateFloorValue(
        uint256 _tokenId,
        uint256 _newValue
    ) external onlyOwner {
        floorValue[_tokenId] = _newValue;
    }
}
