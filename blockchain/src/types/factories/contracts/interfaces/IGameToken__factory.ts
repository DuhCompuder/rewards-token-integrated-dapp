/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGameToken,
  IGameTokenInterface,
} from "../../../contracts/interfaces/IGameToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "claimRewards",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IGameToken__factory {
  static readonly abi = _abi;
  static createInterface(): IGameTokenInterface {
    return new utils.Interface(_abi) as IGameTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IGameToken {
    return new Contract(address, _abi, signerOrProvider) as IGameToken;
  }
}