import fs from "fs";
import { FormatedDeploymentInfo } from "../src/deployment/deploymentTypes";
export async function writeDeploymentInfo(
  deploymentFormat: FormatedDeploymentInfo
) {
  try {
    fs.writeFile(
      `./src/deployment/OperatingDeploymentInfo.json`,
      JSON.stringify(deploymentFormat),
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
