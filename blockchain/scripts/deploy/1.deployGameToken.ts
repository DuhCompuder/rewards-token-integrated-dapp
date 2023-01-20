import { ethers } from "hardhat";
import {
  SavedDeploymentInfo,
  FormatedDeploymentInfo,
} from "../../src/deployment/deploymentTypes";
import { GameToken__factory, GameToken } from "../../src/types";
import { abi } from "../../artifacts/contracts/GameToken.sol/GameToken.json";
import { writeDeploymentInfo } from "../writeToDeploymentFile";
import clc from "cli-color";

async function main() {
  const GameToken: GameToken__factory = await ethers.getContractFactory(
    "GameToken"
  );
  const token: GameToken = await GameToken.deploy();
  await token.deployed();
  console.log("Game Token Contract Deployed to address: ", token.address);

  // create JSON file of each contract and contract details/deployment for the most recent deployed info
  const network = (await ethers.provider.getNetwork()).chainId;
  const deploymentInfo: SavedDeploymentInfo = {
    networkId: network,
    contractABI: abi,
    contractAddress: token.address,
  };

  const formatDeploymentInfo: FormatedDeploymentInfo = {
    gameToken: {
      [network]: deploymentInfo,
    },
  };
  console.log(
    clc.green(
      `Saving deployment info for GameToken contract on network: ${network}...`
    )
  );
  try {
    //Check if file exist. create one if not, otherwise copy from file and modify it.
    const existingFile:
      | FormatedDeploymentInfo
      | undefined = require("../../src/deployment/OperatingDeploymentInfo.json");
    if (existingFile) {
      existingFile.gameToken[network] = deploymentInfo;
      await writeDeploymentInfo(existingFile);
    }
  } catch (e) {
    // uncomment for debug
    // console.error(e);
    console.log(
      clc.yellow("No existing file: Creating new deployment info json file...")
    );
    await writeDeploymentInfo(formatDeploymentInfo);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
