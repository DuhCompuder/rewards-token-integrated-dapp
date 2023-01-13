/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  RockPaperScissors,
  RockPaperScissorsInterface,
} from "../../../contracts/RPSGame.sol/RockPaperScissors";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IGameToken",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "result",
        type: "string",
      },
    ],
    name: "AnnounceResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "player",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum RockPaperScissors.Options",
        name: "playerSelection",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "playerSelectionReadable",
        type: "string",
      },
    ],
    name: "PlayerSelection",
    type: "event",
  },
  {
    inputs: [],
    name: "checkWinnings",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimWins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedWins",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gamesPlayed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pastGameResults",
    outputs: [
      {
        internalType: "enum RockPaperScissors.Result",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum RockPaperScissors.Options",
        name: "selected",
        type: "uint8",
      },
    ],
    name: "playWithAPlayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum RockPaperScissors.Options",
        name: "selected",
        type: "uint8",
      },
    ],
    name: "playWithComputer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerWins",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IGameToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526040518060400160405280601b81526020017f47616d65204f6620526f636b2050617065722053636973736f72730000000000815250600290816200004a919062000347565b503480156200005857600080fd5b5060405162002b2f38038062002b2f83398181016040528101906200007e9190620004ac565b6000600181905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620004de565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200014f57607f821691505b60208210810362000165576200016462000107565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001cf7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000190565b620001db868362000190565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000228620002226200021c84620001f3565b620001fd565b620001f3565b9050919050565b6000819050919050565b620002448362000207565b6200025c62000253826200022f565b8484546200019d565b825550505050565b600090565b6200027362000264565b6200028081848462000239565b505050565b5b81811015620002a8576200029c60008262000269565b60018101905062000286565b5050565b601f821115620002f757620002c1816200016b565b620002cc8462000180565b81016020851015620002dc578190505b620002f4620002eb8562000180565b83018262000285565b50505b505050565b600082821c905092915050565b60006200031c60001984600802620002fc565b1980831691505092915050565b600062000337838362000309565b9150826002028217905092915050565b6200035282620000cd565b67ffffffffffffffff8111156200036e576200036d620000d8565b5b6200037a825462000136565b62000387828285620002ac565b600060209050601f831160018114620003bf5760008415620003aa578287015190505b620003b6858262000329565b86555062000426565b601f198416620003cf866200016b565b60005b82811015620003f957848901518255600182019150602085019450602081019050620003d2565b8683101562000419578489015162000415601f89168262000309565b8355505b6001600288020188555050505b505050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620004608262000433565b9050919050565b6000620004748262000453565b9050919050565b620004868162000467565b81146200049257600080fd5b50565b600081519050620004a6816200047b565b92915050565b600060208284031215620004c557620004c46200042e565b5b6000620004d58482850162000495565b91505092915050565b61264180620004ee6000396000f3fe6080604052600436106100915760003560e01c80638b31fb89116100595780638b31fb8914610157578063a40c102514610194578063b47f1de9146101d1578063d447e9bc146101ed578063fc0c546a1461022a57610091565b806306fdde031461009657806346c86a22146100c15780635ee715d6146100ea5780636c39b7ee14610115578063740db6b814610140575b600080fd5b3480156100a257600080fd5b506100ab610255565b6040516100b89190611897565b60405180910390f35b3480156100cd57600080fd5b506100e860048036038101906100e391906118e3565b6102e3565b005b3480156100f657600080fd5b506100ff610727565b60405161010c9190611929565b60405180910390f35b34801561012157600080fd5b5061012a610891565b6040516101379190611929565b60405180910390f35b34801561014c57600080fd5b50610155610897565b005b34801561016357600080fd5b5061017e600480360381019061017991906119a2565b610ade565b60405161018b9190611929565b60405180910390f35b3480156101a057600080fd5b506101bb60048036038101906101b691906119fb565b610af6565b6040516101c89190611a9f565b60405180910390f35b6101eb60048036038101906101e691906118e3565b610b16565b005b3480156101f957600080fd5b50610214600480360381019061020f91906119a2565b610f41565b6040516102219190611929565b60405180910390f35b34801561023657600080fd5b5061023f610f59565b60405161024c9190611b19565b60405180910390f35b6002805461026290611b63565b80601f016020809104026020016040519081016040528092919081815260200182805461028e90611b63565b80156102db5780601f106102b0576101008083540402835291602001916102db565b820191906000526020600020905b8154815290600101906020018083116102be57829003601f168201915b505050505081565b600073ffffffffffffffffffffffffffffffffffffffff1660036000600154815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610432573360036000600154815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060036000600154815260200190815260200160002060010160146101000a81548160ff021916908360028111156103e1576103e0611a28565b5b02179055507f0bd8031d8198abf312f83ab34e767987c4723803342bb0812b568871ac62c686600154338361041585610f7d565b6040516104259493929190611c37565b60405180910390a1610724565b3373ffffffffffffffffffffffffffffffffffffffff1660036000600154815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104cf90611d2e565b60405180910390fd5b3360036000600154815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060036000600154815260200190815260200160002060020160146101000a81548160ff0219169083600281111561056a57610569611a28565b5b02179055507f0bd8031d8198abf312f83ab34e767987c4723803342bb0812b568871ac62c686600154338361059e85610f7d565b6040516105ae9493929190611d9a565b60405180910390a161070a6003600060015481526020019081526020016000206040518060a0016040529081600082015481526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160149054906101000a900460ff16600281111561065e5761065d611a28565b5b60028111156106705761066f611a28565b5b81526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff1660028111156106ef576106ee611a28565b5b600281111561070157610700611a28565b5b8152505061108f565b600180600082825461071c9190611e28565b925050819055505b50565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054106107e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e090611ea8565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546108759190611ec8565b905060006103e8826108879190611efc565b9050809250505090565b60015481565b600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410610957576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094e90611ea8565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546109e39190611ec8565b905080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a349190611e28565b9250508190555060006103e882610a4b9190611efc565b905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639a99b4f033836040518363ffffffff1660e01b8152600401610aa8929190611f3e565b600060405180830381600087803b158015610ac257600080fd5b505af1158015610ad6573d6000803e3d6000fd5b505050505050565b60046020528060005260406000206000915090505481565b60066020528060005260406000206000915054906101000a900460ff1681565b6611c37937e080003411610b5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5690611fd9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660036000600154815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610ce257600060036000600154815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600060036000600154815260200190815260200160002060010160149054906101000a900460ff169050816003600060018054610c459190611e28565b815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806003600060018054610ca79190611e28565b815260200190815260200160002060010160146101000a81548160ff02191690836002811115610cda57610cd9611a28565b5b021790555050505b7f0bd8031d8198abf312f83ab34e767987c4723803342bb0812b568871ac62c6866001543383610d1185610f7d565b604051610d219493929190611c37565b60405180910390a16000610d356002611798565b90506000610d42826117da565b90507f0bd8031d8198abf312f83ab34e767987c4723803342bb0812b568871ac62c6866001543083610d7385610f7d565b604051610d839493929190612045565b60405180910390a160006040518060a0016040528060015481526020013073ffffffffffffffffffffffffffffffffffffffff168152602001836002811115610dcf57610dce611a28565b5b81526020013373ffffffffffffffffffffffffffffffffffffffff168152602001856002811115610e0357610e02611a28565b5b8152509050610e118161108f565b806003600060015481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010160146101000a81548160ff02191690836002811115610ea357610ea2611a28565b5b021790555060608201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160020160146101000a81548160ff02191690836002811115610f1a57610f19611a28565b5b02179055509050506001806000828254610f349190611e28565b9250508190555050505050565b60056020528060005260406000206000915090505481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060006002811115610f9357610f92611a28565b5b826002811115610fa657610fa5611a28565b5b03610fe8576040518060400160405280600481526020017f526f636b00000000000000000000000000000000000000000000000000000000815250905061108a565b60016002811115610ffc57610ffb611a28565b5b82600281111561100f5761100e611a28565b5b03611051576040518060400160405280600581526020017f5061706572000000000000000000000000000000000000000000000000000000815250905061108a565b6040518060400160405280600881526020017f53636973736f727300000000000000000000000000000000000000000000000081525090505b919050565b806080015160028111156110a6576110a5611a28565b5b816040015160028111156110bd576110bc611a28565b5b0361116b577faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546110f38360400151610f7d565b604051602001611103919061212c565b604051602081830303815290604052604051611120929190612161565b60405180910390a1600260066000600154815260200190815260200160002060006101000a81548160ff0219169083600281111561116157611160611a28565b5b0217905550611795565b6000600281111561117f5761117e611a28565b5b8160400151600281111561119657611195611a28565b5b03611379576002808111156111ae576111ad611a28565b5b816080015160028111156111c5576111c4611a28565b5b036112a1577faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546040516111fb9190612203565b60405180910390a1600160046000836020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112579190611e28565b92505081905550600060066000600154815260200190815260200160002060006101000a81548160ff0219169083600281111561129757611296611a28565b5b0217905550611374565b7faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546040516112d2919061227d565b60405180910390a1600160046000836060015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461132e9190611e28565b92505081905550600160066000600154815260200190815260200160002060006101000a81548160ff0219169083600281111561136e5761136d611a28565b5b02179055505b611794565b6001600281111561138d5761138c611a28565b5b816040015160028111156113a4576113a3611a28565b5b0361158857600060028111156113bd576113bc611a28565b5b816080015160028111156113d4576113d3611a28565b5b036114b0577faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c60015460405161140a91906122f7565b60405180910390a1600160046000836020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546114669190611e28565b92505081905550600060066000600154815260200190815260200160002060006101000a81548160ff021916908360028111156114a6576114a5611a28565b5b0217905550611583565b7faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546040516114e19190612397565b60405180910390a1600160046000836060015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461153d9190611e28565b92505081905550600160066000600154815260200190815260200160002060006101000a81548160ff0219169083600281111561157d5761157c611a28565b5b02179055505b611793565b60028081111561159b5761159a611a28565b5b816040015160028111156115b2576115b1611a28565b5b0361179257600160028111156115cb576115ca611a28565b5b816080015160028111156115e2576115e1611a28565b5b036116be577faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546040516116189190612437565b60405180910390a1600160046000836020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546116749190611e28565b92505081905550600060066000600154815260200190815260200160002060006101000a81548160ff021916908360028111156116b4576116b3611a28565b5b0217905550611791565b7faf3d58f15b6499e624a75204661c56b7945306d56db3c61d63a8029edcc22c7c6001546040516116ef91906124d7565b60405180910390a1600160046000836060015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461174b9190611e28565b92505081905550600160066000600154815260200190815260200160002060006101000a81548160ff0219169083600281111561178b5761178a611a28565b5b02179055505b5b5b5b5b50565b6000814244336040516020016117b09392919061256e565b6040516020818303038152906040528051906020012060001c6117d391906125da565b9050919050565b60008082036117ec5760009050611802565b600182036117fd5760019050611802565b600290505b919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611841578082015181840152602081019050611826565b60008484015250505050565b6000601f19601f8301169050919050565b600061186982611807565b6118738185611812565b9350611883818560208601611823565b61188c8161184d565b840191505092915050565b600060208201905081810360008301526118b1818461185e565b905092915050565b600080fd5b600381106118cb57600080fd5b50565b6000813590506118dd816118be565b92915050565b6000602082840312156118f9576118f86118b9565b5b6000611907848285016118ce565b91505092915050565b6000819050919050565b61192381611910565b82525050565b600060208201905061193e600083018461191a565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061196f82611944565b9050919050565b61197f81611964565b811461198a57600080fd5b50565b60008135905061199c81611976565b92915050565b6000602082840312156119b8576119b76118b9565b5b60006119c68482850161198d565b91505092915050565b6119d881611910565b81146119e357600080fd5b50565b6000813590506119f5816119cf565b92915050565b600060208284031215611a1157611a106118b9565b5b6000611a1f848285016119e6565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110611a6857611a67611a28565b5b50565b6000819050611a7982611a57565b919050565b6000611a8982611a6b565b9050919050565b611a9981611a7e565b82525050565b6000602082019050611ab46000830184611a90565b92915050565b6000819050919050565b6000611adf611ada611ad584611944565b611aba565b611944565b9050919050565b6000611af182611ac4565b9050919050565b6000611b0382611ae6565b9050919050565b611b1381611af8565b82525050565b6000602082019050611b2e6000830184611b0a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611b7b57607f821691505b602082108103611b8e57611b8d611b34565b5b50919050565b7f506c617965724100000000000000000000000000000000000000000000000000600082015250565b6000611bca600783611812565b9150611bd582611b94565b602082019050919050565b611be981611964565b82525050565b60038110611c0057611bff611a28565b5b50565b6000819050611c1182611bef565b919050565b6000611c2182611c03565b9050919050565b611c3181611c16565b82525050565b600060a082019050611c4c600083018761191a565b8181036020830152611c5d81611bbd565b9050611c6c6040830186611be0565b611c796060830185611c28565b8181036080830152611c8b818461185e565b905095945050505050565b7f506c61796572422063616e6e6f74206265207468652073616d6520706c61796560008201527f7220617320706c61796572412c20706c656173652073656c656374206f70746960208201527f6f6e2077697468206120646966666572656e74206163636f756e742e00000000604082015250565b6000611d18605c83611812565b9150611d2382611c96565b606082019050919050565b60006020820190508181036000830152611d4781611d0b565b9050919050565b7f506c617965724200000000000000000000000000000000000000000000000000600082015250565b6000611d84600783611812565b9150611d8f82611d4e565b602082019050919050565b600060a082019050611daf600083018761191a565b8181036020830152611dc081611d77565b9050611dcf6040830186611be0565b611ddc6060830185611c28565b8181036080830152611dee818461185e565b905095945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e3382611910565b9150611e3e83611910565b9250828201905080821115611e5657611e55611df9565b5b92915050565b7f546865726520617265206e6f2077696e73206c65667420746f20636c61696d00600082015250565b6000611e92601f83611812565b9150611e9d82611e5c565b602082019050919050565b60006020820190508181036000830152611ec181611e85565b9050919050565b6000611ed382611910565b9150611ede83611910565b9250828203905081811115611ef657611ef5611df9565b5b92915050565b6000611f0782611910565b9150611f1283611910565b9250828202611f2081611910565b91508282048414831517611f3757611f36611df9565b5b5092915050565b6000604082019050611f536000830185611be0565b611f60602083018461191a565b9392505050565b7f4e6f7420656e6f75676820657468657220746f2070617920666f72206120706c60008201527f617920776974682074686520636f6d7075746572000000000000000000000000602082015250565b6000611fc3603483611812565b9150611fce82611f67565b604082019050919050565b60006020820190508181036000830152611ff281611fb6565b9050919050565b7f506c61796572423a20436f6d7075746572000000000000000000000000000000600082015250565b600061202f601183611812565b915061203a82611ff9565b602082019050919050565b600060a08201905061205a600083018761191a565b818103602083015261206b81612022565b905061207a6040830186611be0565b6120876060830185611c28565b8181036080830152612099818461185e565b905095945050505050565b7f426f746820706c61796572732073656c65637465643a20000000000000000000815250565b600081905092915050565b60006120e082611807565b6120ea81856120ca565b93506120fa818560208601611823565b80840191505092915050565b7f2e20497427732061207469652100000000000000000000000000000000000000815250565b6000612137826120a4565b60178201915061214782846120d5565b915061215282612106565b600d8201915081905092915050565b6000604082019050612176600083018561191a565b8181036020830152612188818461185e565b90509392505050565b7f526f636b20736d61736865732073636973736f72732120506c6179657241207760008201527f696e210000000000000000000000000000000000000000000000000000000000602082015250565b60006121ed602383611812565b91506121f882612191565b604082019050919050565b6000604082019050612218600083018461191a565b8181036020830152612229816121e0565b905092915050565b7f506170657220636f7665727320726f636b2120506c61796572422077696e732e600082015250565b6000612267602083611812565b915061227282612231565b602082019050919050565b6000604082019050612292600083018461191a565b81810360208301526122a38161225a565b905092915050565b7f506170657220636f7665727320726f636b2120506c61796572412077696e2100600082015250565b60006122e1601f83611812565b91506122ec826122ab565b602082019050919050565b600060408201905061230c600083018461191a565b818103602083015261231d816122d4565b905092915050565b7f53636973736f727320637574732070617065722120506c61796572422077696e60008201527f732e000000000000000000000000000000000000000000000000000000000000602082015250565b6000612381602283611812565b915061238c82612325565b604082019050919050565b60006040820190506123ac600083018461191a565b81810360208301526123bd81612374565b905092915050565b7f53636973736f727320637574732070617065722120506c61796572412077696e60008201527f7321000000000000000000000000000000000000000000000000000000000000602082015250565b6000612421602283611812565b915061242c826123c5565b604082019050919050565b600060408201905061244c600083018461191a565b818103602083015261245d81612414565b905092915050565b7f526f636b20736d61736865732073636973736f72732120506c6179657242207760008201527f696e732e00000000000000000000000000000000000000000000000000000000602082015250565b60006124c1602483611812565b91506124cc82612465565b604082019050919050565b60006040820190506124ec600083018461191a565b81810360208301526124fd816124b4565b905092915050565b6000819050919050565b61252061251b82611910565b612505565b82525050565b60008160601b9050919050565b600061253e82612526565b9050919050565b600061255082612533565b9050919050565b61256861256382611964565b612545565b82525050565b600061257a828661250f565b60208201915061258a828561250f565b60208201915061259a8284612557565b601482019150819050949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006125e582611910565b91506125f083611910565b925082612600576125ff6125ab565b5b82820690509291505056fea2646970667358221220a8bd4a6c18d67685bf2b0cd93fa846418b1019ad7845bfb3c44128682ec056a664736f6c63430008110033";

type RockPaperScissorsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RockPaperScissorsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RockPaperScissors__factory extends ContractFactory {
  constructor(...args: RockPaperScissorsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<RockPaperScissors> {
    return super.deploy(_token, overrides || {}) as Promise<RockPaperScissors>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, overrides || {});
  }
  override attach(address: string): RockPaperScissors {
    return super.attach(address) as RockPaperScissors;
  }
  override connect(signer: Signer): RockPaperScissors__factory {
    return super.connect(signer) as RockPaperScissors__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RockPaperScissorsInterface {
    return new utils.Interface(_abi) as RockPaperScissorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RockPaperScissors {
    return new Contract(address, _abi, signerOrProvider) as RockPaperScissors;
  }
}
