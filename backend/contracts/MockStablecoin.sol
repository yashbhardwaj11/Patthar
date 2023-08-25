//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Decimals 18
contract MockStablecoin is ERC20 {
    constructor() ERC20("Patthar Coins", "PCNS") {
        _mint(msg.sender, 1000000000000000000000000);
    }

    function mint() public {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
