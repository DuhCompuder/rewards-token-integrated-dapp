// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC20, ERC20Burnable, Ownable {
    mapping(address => bool) private _whitelist;

    modifier accessApproved() {
        require(_whitelist[msg.sender] == true);
        _;
    }

    constructor() ERC20("GameToken", "GMTN") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function giveApproval(address toApprove) public onlyOwner {
        _whitelist[toApprove] = true;
    }

    function claimAward(address to, uint256 amount) internal accessApproved {
        _mint(to, amount);
    }
}
