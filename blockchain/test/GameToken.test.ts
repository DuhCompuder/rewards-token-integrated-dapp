import { ethers } from "hardhat";
import chalk from "chalk";
import chai from "chai";
const { expect } = chai;
import {
  MockSBToken__factory,
  LABABMembership__factory,
} from "../typechain-types";
import { BigNumber, Contract, Wallet } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Deploys Contract", () => {
  it("Correct name passed to contract constructor", async () => {
    const contractName: string = await BABTokenInstance.name();
    expect(contractName).to.be.eq("LABABMembership");
  });
  it("Correct baseURI passed to contract constructor", async () => {
    const contractURI: string = await BABTokenInstance.getBaseURI();
    expect(contractURI).to.be.eq(baseURI);
  });
});
