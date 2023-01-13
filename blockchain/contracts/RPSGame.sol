// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./interfaces/IGameToken.sol";

contract RockPaperScissors {
    IGameToken public token;
    struct GameInfo {
        uint256 gameId;
        address playerA;
        Options playerASelection;
        address playerB;
        Options playerBSelection;
    }

    enum Result {
        PlayerAWins,
        PlayerBWins,
        Tie
    }

    enum Options {
        ROCK,
        PAPER,
        SCISSORS
    }

    modifier claimableWins() {
        require(
            claimedWins[msg.sender] < playerWins[msg.sender],
            "There are no wins left to claim"
        );
        _;
    }

    uint256 public gamesPlayed;
    string public name = "Game Of Rock Paper Scissors";

    mapping(uint256 => GameInfo) private _pastGames;
    mapping(address => uint256) public playerWins;
    mapping(address => uint256) public claimedWins;
    mapping(uint256 => Result) public pastGameResults;

    event AnnounceResult(uint256 gameNumber, string result);
    event PlayerSelection(
        uint256 gameNumber,
        string player,
        address playerAddress,
        Options playerSelection,
        string playerSelectionReadable
    );

    constructor(IGameToken _token) {
        gamesPlayed = 0;
        token = _token;
    }

    function playWithComputer(Options selected) public payable {
        require(
            msg.value > 5000000 gwei,
            "Not enough ether to pay for a play with the computer"
        ); //0.005 eth
        //moves and save existing player selction to the next game
        if (_pastGames[gamesPlayed].playerA != address(0x0)) {
            address existingPlayer = _pastGames[gamesPlayed].playerA;
            Options exitstingSelection = _pastGames[gamesPlayed]
                .playerASelection;
            _pastGames[gamesPlayed + 1].playerA = existingPlayer;
            _pastGames[gamesPlayed + 1].playerASelection = exitstingSelection;
        }
        emit PlayerSelection(
            gamesPlayed,
            "PlayerA",
            msg.sender,
            selected,
            mapSelectionToString(selected)
        );
        uint256 rand = random(2);
        Options computerSelected = mapSelectionToEnum(rand);

        emit PlayerSelection(
            gamesPlayed,
            "PlayerB: Computer",
            address(this),
            computerSelected,
            mapSelectionToString(computerSelected)
        );

        GameInfo memory newGame = GameInfo(
            gamesPlayed,
            address(this),
            computerSelected,
            msg.sender,
            selected
        );

        determineWinner(newGame);

        _pastGames[gamesPlayed] = newGame;
        gamesPlayed += 1;
    }

    function playWithAPlayer(Options selected) public {
        if (_pastGames[gamesPlayed].playerA == address(0x0)) {
            _pastGames[gamesPlayed].playerA = msg.sender;
            _pastGames[gamesPlayed].playerASelection = selected;
            emit PlayerSelection(
                gamesPlayed,
                "PlayerA",
                msg.sender,
                selected,
                mapSelectionToString(selected)
            );
        } else {
            require(
                _pastGames[gamesPlayed].playerA != msg.sender,
                "PlayerB cannot be the same player as playerA, please select option with a different account."
            );
            _pastGames[gamesPlayed].playerB = msg.sender;
            _pastGames[gamesPlayed].playerBSelection = selected;
            emit PlayerSelection(
                gamesPlayed,
                "PlayerB",
                msg.sender,
                selected,
                mapSelectionToString(selected)
            );
            determineWinner(_pastGames[gamesPlayed]);
            gamesPlayed += 1;
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
            pastGameResults[gamesPlayed] = Result.Tie;
        } else if (game.playerASelection == Options.ROCK) {
            if (game.playerBSelection == Options.SCISSORS) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Rock smashes scissors! PlayerA win!"
                );
                playerWins[game.playerA] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerAWins;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Paper covers rock! PlayerB wins."
                );
                playerWins[game.playerB] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerBWins;
            }
        } else if (game.playerASelection == Options.PAPER) {
            if (game.playerBSelection == Options.ROCK) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Paper covers rock! PlayerA win!"
                );
                playerWins[game.playerA] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerAWins;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Scissors cuts paper! PlayerB wins."
                );
                playerWins[game.playerB] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerBWins;
            }
        } else if (game.playerASelection == Options.SCISSORS) {
            if (game.playerBSelection == Options.PAPER) {
                emit AnnounceResult(
                    gamesPlayed,
                    "Scissors cuts paper! PlayerA wins!"
                );
                playerWins[game.playerA] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerAWins;
            } else {
                emit AnnounceResult(
                    gamesPlayed,
                    "Rock smashes scissors! PlayerB wins."
                );
                playerWins[game.playerB] += 1;
                pastGameResults[gamesPlayed] = Result.PlayerBWins;
            }
        }
    }

    function claimWins() public claimableWins {
        uint256 claimMultiplier = playerWins[msg.sender] -
            claimedWins[msg.sender];
        claimedWins[msg.sender] += claimMultiplier;
        uint256 claimAmount = claimMultiplier * 1000;
        token.claimRewards(msg.sender, claimAmount);
    }

    function checkWinnings() public view claimableWins returns (uint256) {
        uint256 claimMultiplier = playerWins[msg.sender] -
            claimedWins[msg.sender];
        uint256 claimAmount = claimMultiplier * 1000;
        return claimAmount;
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
