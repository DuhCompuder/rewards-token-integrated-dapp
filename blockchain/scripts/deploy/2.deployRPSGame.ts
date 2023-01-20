import { ethers } from "hardhat";
import {
  SavedDeploymentInfo,
  FormatedDeploymentInfo,
} from "../../src/deployment/deploymentTypes";
import { RockPaperScissors__factory, RockPaperScissors } from "../../src/types";
import { abi } from "../../artifacts/contracts/RPSGame.sol/RockPaperScissors.json";
import { writeDeploymentInfo } from "../writeToDeploymentFile";
import clc from "cli-color";

async function main() {
  const existingFile:
    | FormatedDeploymentInfo
    | undefined = require("../../src/deployment/OperatingDeploymentInfo.json");

  if (!existingFile) {
    throw new Error(
      "Cannot deploy RockPaperScissors Contract without existing deployment info."
    );
  }
  const network = (await ethers.provider.getNetwork()).chainId;

  const { contractAddress } = existingFile.gameToken[network];

  if (!contractAddress) {
    throw new Error(
      "Cannot deploy RockPaperScissors Contract without GameToken contract address for the correct network."
    );
  }

  const RPSGame: RockPaperScissors__factory = await ethers.getContractFactory(
    "RockPaperScissors"
  );
  const gameRPS: RockPaperScissors = await RPSGame.deploy(contractAddress);
  await gameRPS.deployed();
  console.log(
    "Rock Paper Scissors Contract Deployed to address: ",
    gameRPS.address
  );

  const deploymentInfo: SavedDeploymentInfo = {
    networkId: network,
    contractABI: abi,
    contractAddress: gameRPS.address,
  };

  const formatDeploymentInfo: FormatedDeploymentInfo = {
    ...existingFile,
    rpsGame: {
      [network]: deploymentInfo,
    },
  };
  console.log(
    clc.green(
      `Saving deployment info for RockPaperScissors contract on network: ${network}...`
    )
  );
  await writeDeploymentInfo(formatDeploymentInfo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
