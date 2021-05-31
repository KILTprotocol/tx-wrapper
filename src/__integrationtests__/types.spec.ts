import { getRegistry } from "@substrate/txwrapper-polkadot";
import { rpcToLocalNode } from "../util";
import { cryptoWaitReady } from "@polkadot/util-crypto";

let getBlock: any;
let blockHash: any;
let genesisHash: any;
let metadataRpc: any;
let getRuntimeVersion: any;

beforeAll(async () => {
  await cryptoWaitReady();
  const { block } = await rpcToLocalNode("chain_getBlock");
  const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
    "state_getRuntimeVersion"
  );
  getBlock = block;
  getRuntimeVersion = { specVersion, transactionVersion, specName };
  blockHash = await rpcToLocalNode("chain_getBlockHash");
  genesisHash = await rpcToLocalNode("chain_getBlockHash", [0]);
  metadataRpc = await rpcToLocalNode("state_getMetadata");
});

describe("checks the compatability of the current kilt types", () => {
  it("checks the registry with the current types", () => {
    getRegistry({
      chainName: "mashnet-node",
      specName: getRuntimeVersion.specName,
      specVersion: getRuntimeVersion.specVersion,
      metadataRpc,
    });
  });
});
