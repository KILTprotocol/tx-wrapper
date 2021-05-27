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
let getBlock: any;
let block: any;
let blockHash: any;
let genesisHash: any;
let metadataRpc: any;
let specVersion: any;
let transactionVersion: any;
let specName: any;
let getRuntimeVersion: any;
let registry: TypeRegistry;
let keyring: Keyring;
let unsigned: UnsignedTransaction;
let decodedUnsigned: DecodedUnsignedTx;
let signingPayload: string;
let payloadInfo: any;
let signature: any;
let tx: any;
let expectedTxHash: any;
let actualTxHash: any;
let txInfo: any;
beforeAll(async () => {
  await cryptoWaitReady();

  keyring = new Keyring();
  alice = keyring.addFromUri("//Alice", { name: "Alice" }, "ed25519");
  getBlock = await rpcToLocalNode("chain_getBlock");
  getBlock = { block };
  blockHash = await rpcToLocalNode("chain_getBlockHash");
  genesisHash = await rpcToLocalNode("chain_getBlockHash", [0]);
  metadataRpc = await rpcToLocalNode("state_getMetadata");
  getRuntimeVersion = await rpcToLocalNode("state_getRuntimeVersion");
  getRuntimeVersion = { specVersion, transactionVersion, specName };

  registry = getRegistry({
    chainName: "mashnet-node",
    specName,
    specVersion,
    metadataRpc,
  });
});

describe("Checks the transfer method while connected to the chain", () => {
  it("Creates a transfer", async () => {
    unsigned = methods.balances.transfer(
      {
        value: "90071992547409910",
        dest: "4sejigvu6STHdYmmYf2SuN92aNp8TbrsnBBDUj7tMrJ9Z3cG",
      },
      {
        address: deriveAddress(alice.publicKey, 38),
        blockHash,
        blockNumber: block.header.number,
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: 0,
        specVersion,
        tip: 0,
        transactionVersion,
      },
      {
        metadataRpc,
        registry,
      }
    );
    expect(unsigned).resolves.toBeDefined();
  }, 3000);

  it("Creates a signed payload", () => {
    decodedUnsigned = decode(unsigned, {
      metadataRpc,
      registry,
    });
    console.log("decoded unsigned", decodedUnsigned);
    signingPayload = construct.signingPayload(unsigned, { registry });

    payloadInfo = decode(signingPayload, {
      metadataRpc,
      registry,
    });
    console.log("Payment info", payloadInfo);
    signature = signWith(alice, signingPayload, {
      metadataRpc,
      registry,
    });

    tx = construct.signedTx(unsigned, signature, {
      metadataRpc,
      registry,
    });
  });

  it("Creates the signed transaction offline", () => {
    expectedTxHash = construct.txHash(tx);
  });

  it("Submits the signed transaction to a local chain", async () => {
    actualTxHash = await rpcToLocalNode("author_submitExtrinsic", [tx]);

    txInfo = decode(tx, {
      metadataRpc,
      registry,
    });

    console.log("txInfo", txInfo);
  });
});
