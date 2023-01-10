// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameToken is ERC20, ERC20Burnable, Ownable {
    mapping(address => bool) private _whitelist;

    modifier accessApproved() {
        require(
            _whitelist[msg.sender] == true,
            "Accessor is not on approved whitelist"
        );
        _;
    }

    constructor() ERC20("GameToken", "GMTN") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function checkWhitelist(address account)
        public
        view
        onlyOwner
        returns (bool)
    {
        return _whitelist[account];
    }

    function giveApproval(address toApprove) public onlyOwner {
        if (_whitelist[toApprove] == true) revert("Already approved");
        _whitelist[toApprove] = true;
    }

    function removeApproval(address toRemove) public onlyOwner {
        require(_whitelist[toRemove] == true, "Cannot remove unapproved");
        _whitelist[toRemove] = false;
    }

    function claimAward(address to, uint256 amount) public accessApproved {
        _mint(to, amount);
    }
}
