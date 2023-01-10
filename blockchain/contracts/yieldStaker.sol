// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.13;
import "./interfaces/IGameToken.sol";

abstract contract YieldStaker {
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => uint256) public startTime;
    mapping(address => uint256) public tokenBalance;

    IGameToken public gameToken;

    event Stake(address indexed from, uint256 amount);
    event Unstake(address indexed from, uint256 amount);
    event YieldWithdraw(address indexed to, uint256 amount);

    constructor(IGameToken _gameToken) {
        gameToken = _gameToken;
    }

    receive() external payable;

    function stake() public payable {
        require(msg.value > 0, "You cannot stake zero tokens");

        if (isStaking[msg.sender] == true) {
            uint256 toTransfer = calculateYieldTotal(msg.sender);
            tokenBalance[msg.sender] += toTransfer;
        }

        stakingBalance[msg.sender] += msg.value;
        startTime[msg.sender] = block.timestamp;
        isStaking[msg.sender] = true;
        emit Stake(msg.sender, msg.value);
    }

    function unstake(uint256 amount) public {
        require(
            isStaking[msg.sender] =
                true &&
                stakingBalance[msg.sender] >= amount,
            "Nothing to unstake"
        );
        uint256 yieldTransfer = calculateYieldTotal(msg.sender);
        startTime[msg.sender] = block.timestamp; // bug fix
        uint256 balanceTransfer = amount;
        amount = 0;
        stakingBalance[msg.sender] -= balanceTransfer;
        (bool sent, ) = msg.sender.call{value: balanceTransfer}("");
        require(sent);

        tokenBalance[msg.sender] += yieldTransfer;
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
        emit Unstake(msg.sender, amount);
    }

    function withdrawYield() public {
        uint256 toTransfer = calculateYieldTotal(msg.sender);

        require(
            toTransfer > 0 || tokenBalance[msg.sender] > 0,
            "Nothing to withdraw"
        );

        if (tokenBalance[msg.sender] != 0) {
            uint256 oldBalance = tokenBalance[msg.sender];
            tokenBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        startTime[msg.sender] = block.timestamp;
        gameToken.claimRewards(msg.sender, toTransfer);

        emit YieldWithdraw(msg.sender, toTransfer);
    }

    function calculateYieldTime(address user) public view returns (uint256) {
        uint256 end = block.timestamp;
        uint256 totalTime = end - startTime[user];
        return totalTime;
    }

    function calculateYieldTotal(address user) public view returns (uint256) {
        uint256 time = calculateYieldTime(user) * 10**18;
        uint256 rate = 1 days;
        uint256 timeRate = time / rate;
        uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;
        return rawYield;
    }
}
