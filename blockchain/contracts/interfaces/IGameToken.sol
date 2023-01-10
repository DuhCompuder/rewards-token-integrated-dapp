// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IGameToken {
    function claimRewards(address claimer, uint256 amount)
        external
        returns (bool);
}
