// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IGameToken {
    function claimRewards(address claimer, uint256 amount)
        external
        returns (bool);
}
