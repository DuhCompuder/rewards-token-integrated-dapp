import { ethers } from "hardhat";
import chai from "chai";
const { expect } = chai;
import {
  RockPaperScissors__factory,
  GameToken__factory,
  RockPaperScissors,
  GameToken,
} from "../src/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { token } from "../src/types/@openzeppelin/contracts";
import { ContractReceipt, ContractTransaction, Event, utils } from "ethers";

describe("Rock Paper Scissors Game", () => {
  let gameRPS: RockPaperScissors;
  let token: GameToken;
  let userPlayerOne: SignerWithAddress;
  let userPlayerTwo: SignerWithAddress; //mock token contract
  let gameTokenAddress: String;
  beforeEach(async () => {
    const GameToken: GameToken__factory = await ethers.getContractFactory(
      "GameToken"
    );
    token = await GameToken.deploy();
    await token.deployed();
    gameTokenAddress = token.address;

    const RPSGame: RockPaperScissors__factory = await ethers.getContractFactory(
      "RockPaperScissors"
    );
    gameRPS = await RPSGame.deploy(token.address);
    [userPlayerOne, userPlayerTwo] = await ethers.getSigners();
  });
  describe("Deployment", () => {
    it("Initializes", async () => {
      expect(token).to.be.ok;
      expect(gameRPS).to.be.ok;
    });
    it("Retrieved descriptive name of contract", async () => {
      const name: String = await gameRPS.name();
      expect(name).to.be.eq("Game Of Rock Paper Scissors");
    });
    it("Correct token contract address passed to contract constructor", async () => {
      const tokenAddr: String = await gameRPS.token();
      expect(tokenAddr).to.be.eq(gameTokenAddress);
    });
  });
  describe("Play with a computer", () => {
    it("should revert if user did not pay enough eth to play", async () => {
      await expect(
        gameRPS.connect(userPlayerOne).playWithComputer(2)
      ).to.revertedWith("Not enough ether to pay for a play with the computer");
    });
    it("Plays with proper resulting events", async () => {
      const tx: ContractTransaction = await gameRPS
        .connect(userPlayerOne)
        .playWithComputer(0, { value: utils.parseEther("0.006") });
      const transactionDetails: ContractReceipt = await tx.wait();

      expect(transactionDetails.events?.length).to.eq(3);

      const eventPlayerSelection: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) =>
            log.event == "PlayerSelection" && log.args!.player == "PlayerA"
        );
      const eventComputerPlayerSelection: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) =>
            log.event == "PlayerSelection" &&
            log.args!.player == "PlayerB: Computer"
        );

      expect(eventPlayerSelection!.args!.playerAddress).to.eq(
        userPlayerOne.address
      );
      expect(eventComputerPlayerSelection!.args!.playerAddress).to.eq(
        gameRPS.address
      );

      const eventAnnounceResult: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) => log.event == "AnnounceResult"
        );
      expect(eventAnnounceResult!.args!.result).to.be.ok;
    });
  });
  describe("Play with another player with proper game results", () => {
    it("rock beats scissors", async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(0);
      const tx: ContractTransaction = await gameRPS
        .connect(userPlayerTwo)
        .playWithAPlayer(1);
      const transactionDetails: ContractReceipt = await tx.wait();
      const eventAnnounceResult: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) => log.event == "AnnounceResult"
        );
      expect(eventAnnounceResult?.args).to.include(
        "Paper covers rock! PlayerB wins."
      );
    });
    it("paper beats rock", async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(1);
      const tx: ContractTransaction = await gameRPS
        .connect(userPlayerTwo)
        .playWithAPlayer(0);
      const transactionDetails: ContractReceipt = await tx.wait();
      const eventAnnounceResult: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) => log.event == "AnnounceResult"
        );
      expect(eventAnnounceResult?.args).to.include(
        "Paper covers rock! PlayerA win!"
      );
    });
    it("scissors beat paper", async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(2);
      const tx: ContractTransaction = await gameRPS
        .connect(userPlayerTwo)
        .playWithAPlayer(1);
      const transactionDetails: ContractReceipt = await tx.wait();
      const eventAnnounceResult: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) => log.event == "AnnounceResult"
        );
      expect(eventAnnounceResult?.args).to.include(
        "Scissors cuts paper! PlayerA wins!"
      );
    });
    it("tie game when selection are the same beat paper", async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(2);
      const tx: ContractTransaction = await gameRPS
        .connect(userPlayerTwo)
        .playWithAPlayer(2);
      const transactionDetails: ContractReceipt = await tx.wait();
      const eventAnnounceResult: Event | undefined =
        transactionDetails.events?.find(
          (log: Event) => log.event == "AnnounceResult"
        );
      expect(eventAnnounceResult?.args?.result).to.contain("It's a tie!");
    });
    it("fails if same player tries to play against self", async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(2);
      await expect(
        gameRPS.connect(userPlayerOne).playWithAPlayer(2)
      ).to.revertedWith(
        "PlayerB cannot be the same player as playerA, please select option with a different account."
      );
    });
  });
  describe("Play with a computer when player game is not concluded", () => {
    it("Player game postpones to next game when game with computer interrupts", async () => {
      const gameCount = await gameRPS.gamesPlayed();

      await gameRPS.connect(userPlayerOne).playWithAPlayer(1);
      await gameRPS
        .connect(userPlayerOne)
        .playWithComputer(2, { value: utils.parseEther("0.006") });

      expect(Number(await gameRPS.gamesPlayed())).to.eq(Number(gameCount) + 1);

      await expect(
        gameRPS.connect(userPlayerOne).playWithAPlayer(2)
      ).to.revertedWith(
        "PlayerB cannot be the same player as playerA, please select option with a different account."
      );

      await gameRPS.connect(userPlayerTwo).playWithAPlayer(2);
      expect(Number(await gameRPS.gamesPlayed())).to.eq(Number(gameCount) + 2);
    });
  });
  describe("Claim winnnings", () => {
    beforeEach(async () => {
      await gameRPS.connect(userPlayerOne).playWithAPlayer(0);
      await gameRPS.connect(userPlayerTwo).playWithAPlayer(1);
      await gameRPS.connect(userPlayerOne).playWithAPlayer(0);
      await gameRPS.connect(userPlayerTwo).playWithAPlayer(1);
    });
    it("Proper accounting of winnings", async () => {
      const player2Wins = Number(
        await gameRPS.playerWins(userPlayerTwo.address)
      );
      expect(player2Wins).to.eq(2);
      expect(
        Number(await gameRPS.connect(userPlayerTwo).checkWinnings())
      ).to.eq(player2Wins * 1000);
    });
    it("Should fail if there are no claimable wins", async () => {
      await expect(
        gameRPS.connect(userPlayerOne).claimWins()
      ).to.be.revertedWith("There are no wins left to claim");
    });
    it("Should claim winnings successfully and prevent from reclaims", async () => {
      expect(await token.checkWhitelist(gameRPS.address)).to.eq(false);
      await token.giveApproval(gameRPS.address);
      expect(await token.checkWhitelist(gameRPS.address)).to.eq(true);
      expect(Number(await gameRPS.claimedWins(userPlayerTwo.address))).to.eq(0);
      await gameRPS.connect(userPlayerTwo).claimWins();
      expect(Number(await gameRPS.claimedWins(userPlayerTwo.address))).to.eq(2);
      await expect(
        gameRPS.connect(userPlayerTwo).claimWins()
      ).to.be.revertedWith("There are no wins left to claim");
    });
    it("Should fails game token contract has not approve this contract to mint rewards", async () => {
      await expect(
        gameRPS.connect(userPlayerTwo).claimWins()
      ).to.be.revertedWith("Accessor is not on approved whitelist");
    });
  });
});
