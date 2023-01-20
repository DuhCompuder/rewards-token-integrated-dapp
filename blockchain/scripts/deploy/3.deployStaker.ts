import { ethers } from "hardhat";
import {
  SavedDeploymentInfo,
  FormatedDeploymentInfo,
} from "../../src/deployment/deploymentTypes";
import { YieldStaker, YieldStaker__factory } from "../../src/types";
import { abi } from "../../artifacts/contracts/RPSGame.sol/RockPaperScissors.json";
import { writeDeploymentInfo } from "../writeToDeploymentFile";
import clc from "cli-color";

async function main() {
  const existingFile:
    | FormatedDeploymentInfo
    | undefined = require("../../src/deployment/OperatingDeploymentInfo.json");

  if (!existingFile) {
    throw new Error(
      "Cannot deploy YieldStaker Contract without existing deployment info."
    );
  }
  const network = (await ethers.provider.getNetwork()).chainId;

  const { contractAddress } = existingFile.gameToken[network];

  if (!contractAddress) {
    throw new Error(
      "Cannot deploy YieldStaker Contract without GameToken contract address for the correct network."
    );
  }

  const YieldStaker: YieldStaker__factory = await ethers.getContractFactory(
    "YieldStaker"
  );
  const yieldStaker: YieldStaker = await YieldStaker.deploy(contractAddress);
  await yieldStaker.deployed();
  console.log(
    "Rock Paper Scissors Contract Deployed to address: ",
    yieldStaker.address
  );

  const deploymentInfo: SavedDeploymentInfo = {
    networkId: network,
    contractABI: abi,
    contractAddress: yieldStaker.address,
  };

  const formatDeploymentInfo: FormatedDeploymentInfo = {
    ...existingFile,
    yieldStaker: {
      [network]: deploymentInfo,
    },
  };
  console.log(
    clc.green(
      `Saving deployment info for YieldStaker contract on network: ${network}...`
    )
  );
  await writeDeploymentInfo(formatDeploymentInfo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
