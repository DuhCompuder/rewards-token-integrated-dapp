import { ethers } from "hardhat";
import { expect } from "chai";
import {
  GameToken__factory,
  GameToken,
  YieldStaker,
  YieldStaker__factory,
} from "../src/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("YieldStaker", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let res: any;
  let token: GameToken;
  let yieldStaker: YieldStaker;

  beforeEach(async () => {
    const YieldStaker: YieldStaker__factory = await ethers.getContractFactory(
      "YieldStaker"
    );
    const GameToken: GameToken__factory = await ethers.getContractFactory(
      "GameToken"
    );

    [owner, alice, bob] = await ethers.getSigners();

    token = await GameToken.deploy();
    yieldStaker = await YieldStaker.deploy(token.address);
  });

  describe("Init", async () => {
    it("should initialize", async () => {
      expect(token).to.be.ok;
      expect(yieldStaker).to.be.ok;
    });
  });

  describe("Stake", async () => {
    it("should accept ether and update mapping", async () => {
      const toTransfer = ethers.utils.parseEther("100");

      expect(await yieldStaker.isStaking(alice.address)).to.eq(false);

      expect(await yieldStaker.connect(alice).stake({ value: toTransfer })).to
        .be.ok;

      expect(await yieldStaker.stakingBalance(alice.address)).to.eq(toTransfer);

      expect(await yieldStaker.isStaking(alice.address)).to.eq(true);
    });

    it("should update balance with multiple stakes", async () => {
      let toTransfer = ethers.utils.parseEther("100");
      await yieldStaker.connect(alice).stake({ value: toTransfer });

      await yieldStaker.connect(alice).stake({ value: toTransfer });

      expect(await yieldStaker.stakingBalance(alice.address)).to.eq(
        ethers.utils.parseEther("200")
      );
    });

    it("should revert with not enough funds", async () => {
      let toTransfer = 0;

      await expect(
        yieldStaker.connect(bob).stake({ value: toTransfer })
      ).to.be.revertedWith("You cannot stake zero tokens");
    });
  });

  describe("Unstake", async () => {
    beforeEach(async () => {
      let toTransfer = ethers.utils.parseEther("100");
      await yieldStaker.connect(alice).stake({ value: toTransfer });
    });

    it("should unstake balance from user", async () => {
      let toTransfer = ethers.utils.parseEther("100");
      await yieldStaker.connect(alice).unstake(toTransfer);

      res = await yieldStaker.stakingBalance(alice.address);
      expect(Number(res)).to.eq(0);

      expect(await yieldStaker.isStaking(alice.address)).to.eq(false);
    });
  });

  describe("WithdrawYield", async () => {
    beforeEach(async () => {
      await token.giveApproval(yieldStaker.address);
      let toTransfer = ethers.utils.parseEther("10");
      await yieldStaker.connect(alice).stake({ value: toTransfer });
    });

    it("should return correct yield time", async () => {
      let timeStart = await yieldStaker.startTime(alice.address);
      expect(Number(timeStart)).to.be.greaterThan(0);

      // Fast-forward time
      await time.increase(86400);

      expect(await yieldStaker.calculateYieldTime(alice.address)).to.eq(86400);
    });

    it("yieldStaker should have permission to gameToken contract", async () => {
      await token.giveApproval(yieldStaker.address);
      expect(await token.checkWhitelist(yieldStaker.address)).to.eq(true);
    });

    it("should award correct token amount in total supply and user", async () => {
      await time.increase(86400);

      let _time = await yieldStaker.calculateYieldTime(alice.address);

      let formatTime = _time.toNumber() / 86400;

      let staked = await yieldStaker.stakingBalance(alice.address);
      console.log("staked: ", ethers.utils.formatEther(staked.toString()));
      let formatStaked = Number(ethers.utils.formatEther(staked.toString()));
      let rewardBalance = formatStaked * formatTime;

      await token.giveApproval(yieldStaker.address);
      expect(await token.checkWhitelist(yieldStaker.address)).to.eq(true);
      await yieldStaker.connect(alice).withdrawYield();

      res = await token.totalSupply();
      const tokenTotalSupply = Number(ethers.utils.formatEther(res));

      expect(rewardBalance).to.eq(tokenTotalSupply);

      res = await token.balanceOf(alice.address);
      const aliceBalance = ethers.utils.formatEther(res);

      expect(aliceBalance).to.eq(tokenTotalSupply);
    });

    it("should update yield balance when unstaked", async () => {
      await time.increase(86400);
      await yieldStaker.connect(alice).unstake(ethers.utils.parseEther("5"));

      res = await yieldStaker.tokenBalance(alice.address);
      expect(Number(ethers.utils.formatEther(res))).to.be.approximately(
        10,
        0.001
      );
    });
  });
});
