import { Keyring } from "@polkadot/api";
import {
  deriveAddress,
  KeyringPair,
  decode,
  construct,
  UnsignedTransaction,
  TypeRegistry,
  DecodedUnsignedTx,
} from "@substrate/txwrapper-core";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { rpcToLocalNode, signWith } from "../util";
import { methods, getRegistry } from "../index";

let alice: KeyringPair;
let bob: KeyringPair;
let blockHash: string;
let genesisHash: string;
let metadataRpc: any;
let getRuntimeVersion: any;
let registry: TypeRegistry;
let keyring: Keyring;
let unsigned: UnsignedTransaction;
let signingPayload: string;
let signature: any;
let tx: any;
let expectedTxHash: any;
let actualTxHash: any;

beforeAll(async () => {
  await cryptoWaitReady();

  keyring = new Keyring();
  alice = keyring.addFromUri("//Alice", { name: "Alice" }, "ed25519");
  bob = keyring.addFromUri("//Bob", { name: "Bob" }, "ed25519");
  const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
    "state_getRuntimeVersion"
  );
  getRuntimeVersion = { specVersion, transactionVersion, specName };
  blockHash = await rpcToLocalNode("chain_getBlockHash");
  genesisHash = await rpcToLocalNode("chain_getBlockHash", [0]);
  metadataRpc = await rpcToLocalNode("state_getMetadata");

  registry = getRegistry({
    chainName: "mashnet-node",
    specName: getRuntimeVersion.specName,
    specVersion: getRuntimeVersion.specVersion,
    metadataRpc,
  });
});

describe("Checks the transfer method while connected to the chain", () => {
  it("Creates a transfer", async () => {
    const { block } = await rpcToLocalNode("chain_getBlock");

    unsigned = methods.balances.transfer(
      {
        value: "90071992547409910",
        dest: deriveAddress(bob.publicKey, 38),
      },
      {
        address: deriveAddress(alice.publicKey, 38),
        blockHash,
        blockNumber: block.header.number,
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: 0,
        specVersion: getRuntimeVersion.specVersion,
        tip: 0,
        transactionVersion: getRuntimeVersion.transactionVersion,
      },
      {
        metadataRpc,
        registry,
      }
    );

    signingPayload = construct.signingPayload(unsigned, { registry });

    signature = signWith(alice, signingPayload, {
      metadataRpc,
      registry,
    });

    tx = construct.signedTx(unsigned, signature, {
      metadataRpc,
      registry,
    });

    expectedTxHash = construct.txHash(tx);

    actualTxHash = await rpcToLocalNode("author_submitExtrinsic", [tx]);
    expect(expectedTxHash).toEqual(actualTxHash);
  }, 30000);
});
