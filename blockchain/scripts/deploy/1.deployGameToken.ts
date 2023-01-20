import { ethers } from "hardhat";
import {
  SavedDeploymentInfo,
  FormatedDeploymentInfo,
} from "../../src/deployment/deploymentTypes";
import { GameToken__factory, GameToken } from "../../src/types";
import { abi } from "../../artifacts/contracts/GameToken.sol/GameToken.json";
import fs from "fs";

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

  //Check if file exist. create one if not, otherwise copy from file and modify it.
  try {
    fs.writeFile(
      `./src/deployment/OperatingDeploymentInfo.json`,
      JSON.stringify(formatDeploymentInfo),
      (err) => {
        err
          ? console.error(err)
          : console.log(`Write OperatingDeploymentInfo.json Succeeded.`);
      }
    );
  } catch {
    console.error("Write OperatingDeploymentInfo.json file failed.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
