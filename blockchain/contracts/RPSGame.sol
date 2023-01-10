// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./interfaces/IGameToken.sol";

contract RockPaperScissors {
    IGameToken _token;

    struct GameInfo {
        address playerA;
        Options playerASelection;
        address playerB;
        Options playerBSelection;
    }

    enum Options {
        ROCK,
        PAPER,
        SCISSORS
    }

    uint256 public gamesPlayed;
    mapping(uint256 => GameInfo) private _pastGames;
    mapping(address => uint256) public playerWins;
    mapping(address => uint256) public claimedWins;

    event AnnounceResult(uint256 gameNumber, string result);

    constructor(IGameToken token) {
        gamesPlayed = 0;
        _token = token;
    }

    function playWithComputer(Options selected) public returns (string memory) {
        uint256 rand = random(2);
        Options computerSelected = mapSelectionToEnum(rand);

        address test = address(this);

        GameInfo memory newGame = GameInfo(
            address(this),
            computerSelected,
            msg.sender,
            selected
        );

        determineWinner(newGame);

        _pastGames[gamesPlayed] = newGame;
        gamesPlayed += 1;
    }

    function playWithAPlayer(Options selected) public returns (string memory) {
        if (_pastGames[gamesPlayed].playerA == address(0x0)) {
            _pastGames[gamesPlayed].playerA = msg.sender;
            _pastGames[gamesPlayed].playerASelection = selected;
            // emit PlayerSelections(
            //     gamesPlayed,
            //     "PlayerA",
            //     msg.sender,
            //     selected,
            //     mapSelectionToString(selected)
            // );
        } else {
            require(
                _pastGames[gamesPlayed].playerA != msg.sender,
                "PlayerB cannot be the same player as playerA, please select option with a different account."
            );
            _pastGames[gamesPlayed].playerB = msg.sender;
            _pastGames[gamesPlayed].playerBSelection = selected;
            // emit PlayerSelections(
            //     gamesPlayed,
            //     "PlayerB",
            //     msg.sender,
            //     selected,
            //     mapSelectionToString(selected)
            // );
            determineWinner(_pastGames[gamesPlayed]);
        }
    }

    function determineWinner(GameInfo memory game) internal {
        if (game.playerASelection == game.playerBSelection) {
            emit AnnounceResult(
                gamesPlayed,
                string.concat(
                    "Both players selected: ",
                    mapSelectionToString(game.playerASelection),
                    ". It's a tie!"
                )
            );
        } else if (game.playerASelection == Options.ROCK) {
            if (game.playerBSelection == Options.SCISSORS) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Rock smashes scissors! PlayerA win!"
                );
                playerWins[game.PlayerA] += 1;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Paper covers rock! PlayerB wins."
                );
                playerWins[game.PlayerB] += 1;
            }
        } else if (game.playerASelection == Options.PAPER) {
            if (game.playerBSelection == Options.ROCK) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Paper covers rock! PlayerA win!"
                );
                playerWins[game.PlayerA] += 1;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Scissors cuts paper! PlayerB wins."
                );
                playerWins[game.PlayerB] += 1;
            }
        } else if (game.playerASelection == Options.SCISSORS) {
            if (game.playerBSelection == Options.PAPER) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Scissors cuts paper! PlayerA wins!"
                );
                playerWins[game.PlayerA] += 1;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Rock smashes scissors! PlayerB wins."
                );
                playerWins[game.PlayerB] += 1;
            }
        }
    }

    function claimWins() public {
        require(claimedWins[msg.sender] < playerWins[msg.sender]);
        uint256 claimMultiplier = playerWins[msg.sender] -
            claimedWins[msg.sender];
        claimedWins[msg.sender] += claimMultiplier;
        uint256 claimAmount = claimMultiplier * 1000;
        _token.claimRewards(msg.sender, claimAmount);
    }

    function mapSelectionToEnum(uint256 selected)
        private
        pure
        returns (Options)
    {
        if (selected == 0) {
            return Options.ROCK;
        } else if (selected == 1) {
            return Options.PAPER;
        } else {
            return Options.SCISSORS;
        }
    }

    function random(uint256 num) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % num;
    }

    function mapSelectionToString(Options selected)
        internal
        pure
        returns (string memory)
    {
        if (selected == Options.ROCK) {
            return "Rock";
        } else if (selected == Options.PAPER) {
            return "Paper";
        } else {
            return "Scissors";
        }
    }
}
