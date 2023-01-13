import { ethers } from "hardhat";
import chalk from "chalk";
import chai from "chai";
const { expect } = chai;
import {
  RockPaperScissors__factory,
  GameToken__factory,
  RockPaperScissors,
  GameToken,
} from "../src/types";
import { BigNumber, Wallet, Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { token } from "../src/types/@openzeppelin/contracts";

describe("Rock Paper Scissors Game", () => {
  let gameRPS: RockPaperScissors;
  let token: GameToken;
  let userPlayerOne: Signer;
  let userPlayerTwo: Signer; //mock token contract
  let gameTokenAddress: String;
  before(async () => {
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
    it("Initializes", async () => {
      expect(token).to.be.ok;
      expect(gameRPS).to.be.ok;
    });
  });
  describe("Play with another player", () => {
    it("Initializes", async () => {
      expect(token).to.be.ok;
      expect(gameRPS).to.be.ok;
    });
  });
  describe("Claim winnnings", () => {
    it("Initializes", async () => {
      expect(token).to.be.ok;
      expect(gameRPS).to.be.ok;
    });
  });
});
