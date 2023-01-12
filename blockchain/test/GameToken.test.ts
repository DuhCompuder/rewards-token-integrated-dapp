import { ethers } from "hardhat";
import chai from "chai";
const { expect, assert } = chai;
import { GameToken__factory, GameToken } from "../src/types";
import { BigNumber, Signer } from "ethers";

describe("ERC20 Game Token", () => {
  let token: GameToken;
  let addrOne: Signer;
  let addrTwo: Signer; //mock token contract
  beforeEach(async () => {
    const GameToken: GameToken__factory = await ethers.getContractFactory(
      "GameToken"
    );
    token = await GameToken.deploy();
    [addrOne, addrTwo] = await ethers.getSigners();
  });
  describe("Deployment", () => {
    it("should have correct name", async () => {
      const name: String = await token.name();
      expect(name).to.be.eq("GameToken");
    });
    it("should have correct symbol", async () => {
      const symbol: String = await token.symbol();
      expect(symbol).to.be.eq("GMTN");
    });
    it("should have 18 decimal places", async () => {
      const decimalPlaces: Number = await token.decimals();
      expect(decimalPlaces).to.be.eq(18);
    });
  });
  describe("Minting", () => {
    beforeEach(async () => {
      await token.mint(addrOne.getAddress(), BigNumber.from(500));
      await token.mint(addrTwo.getAddress(), BigNumber.from(1500));
    });
    it("should have proper balance after minting", async () => {
      expect(await token.balanceOf(addrOne.getAddress())).to.eq(500);
      expect(await token.balanceOf(addrTwo.getAddress())).to.eq(1500);
    });
    it("should have proper total supply after minting", async () => {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.eq(2000);
    });
  });
  describe("Transfer", () => {
    it("should transfer tokens correctly", async () => {
      const sender: Promise<string> = addrOne.getAddress();
      const recipient: Promise<string> = addrTwo.getAddress();
      const transferAmount: BigNumber = BigNumber.from(1800);

      await token.mint(addrOne.getAddress(), 3000);
      await token.transfer(recipient, transferAmount, { from: sender });

      expect(await token.balanceOf(sender)).to.eq(1200);
      expect(await token.balanceOf(recipient)).to.eq(1800);
    });
  });
  describe("Rewards", () => {
    it("should fail if awarder is not in white list", async () => {
      await expect(
        token.claimRewards(addrOne.getAddress(), BigNumber.from(1000))
      ).to.be.revertedWith("Accessor is not on approved whitelist");
    });
    it("should award correctly", async () => {
      await token.giveApproval(addrOne.getAddress());
      await token.claimRewards(addrOne.getAddress(), BigNumber.from(3000));
      expect(await token.balanceOf(addrOne.getAddress())).to.eq(3000);
    });
    it("should remove rewarder access correctly", async () => {
      await token.giveApproval(addrOne.getAddress());
      const isApproved: Boolean = await token.checkWhitelist(
        addrOne.getAddress()
      );
      assert.equal(isApproved, true);
      await token.removeApproval(addrOne.getAddress());
      await expect(
        token.claimRewards(addrOne.getAddress(), BigNumber.from(1000))
      ).to.be.revertedWith("Accessor is not on approved whitelist");
    });
    it("should fail removing rewarder access if rewarder was not already approved", async () => {
      await expect(
        token.removeApproval(addrTwo.getAddress())
      ).to.be.revertedWith("Cannot remove unapproved");
    });
  });
});
