// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./interfaces/IGameToken.sol";

abstract contract GameTokenUpgradeable is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    OwnableUpgradeable,
    IGameToken
{
    mapping(address => bool) private _whitelist;

    modifier accessApproved() {
        require(_whitelist[msg.sender] == true);
        _;
    }

    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC20_init("GameToken", "GMTN");
        __ERC20Burnable_init();
        __Ownable_init();
    }

    function giveApproval(address toApprove) public onlyOwner {
        _whitelist[toApprove] = true;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function claimAward(address to, uint256 amount) internal accessApproved {
        _mint(to, amount);
    }
}
