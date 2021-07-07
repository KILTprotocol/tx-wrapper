import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import { getRegistry, methods } from "../index";
import { rpcToLocalNode, signWith } from "../util";
import { deriveAddress, construct } from "@substrate/txwrapper-polkadot";
import accountList from "./accountList";

type Transferables = {
  seed: string;
  address: string;
  amount: number;
};

async function multiTransfer(
  transfers: Transferables[],
  identity: string
): Promise<string> {
  await cryptoWaitReady();

  const keyring = new Keyring();

  const sender = keyring.addFromUri("//Alice");
  console.log("start");
  const { block } = await rpcToLocalNode("chain_getBlock");
  console.log(block);
  const blockHash = await rpcToLocalNode("chain_getBlockHash");
  console.log(blockHash);
  const genesisHash = await rpcToLocalNode("chain_getBlockHash", [0]);
  console.log(genesisHash);
  const metadataRpc = await rpcToLocalNode("state_getMetadata");
  console.log(metadataRpc);
  const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
    "state_getRuntimeVersion"
  );
  console.log(specVersion, transactionVersion, specName);
  const registry = getRegistry({
    chainName: "kilt-parachain",
    specName,
    specVersion,
    metadataRpc,
  });

  const transferables = transfers.map((txInfo: Transferables) => {
    const { method } = methods.balances.transferKeepAlive(
      { value: txInfo.amount, dest: txInfo.address },
      {
        address: deriveAddress(sender.publicKey, 38),
        blockHash,
        blockNumber: registry
          .createType("BlockNumber", block.header.number)
          .toNumber(),
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: 0, // Assuming this is Alice's first tx on the chain
        specVersion,
        tip: 0,
        transactionVersion,
      },
      {
        metadataRpc,
        registry,
      }
    );

    return method;
  });
  console.log(transferables);
  const unsigned = methods.utility.batchAll(
    { calls: transferables },
    {
      address: deriveAddress(sender.publicKey, 38),
      blockHash,
      blockNumber: registry
        .createType("BlockNumber", block.header.number)
        .toNumber(),
      eraPeriod: 64,
      genesisHash,
      metadataRpc,
      nonce: 0, // Assuming this is Alice's first tx on the chain
      specVersion,
      tip: 0,
      transactionVersion,
    },
    {
      metadataRpc,
      registry,
    }
  );
  console.log(unsigned);

  const signingPayload = construct.signingPayload(unsigned, { registry });
  console.log(signingPayload);
  const signature = signWith(sender, signingPayload, { metadataRpc, registry });
  console.log(signature);
  const tx = construct.signedTx(unsigned, signature, { metadataRpc, registry });
  console.log(tx);
  const expectedTxHash = construct.txHash(tx);
  console.log(expectedTxHash);
  return expectedTxHash;
}

multiTransfer(
  accountList,
  "0xc24563ce2be5c20fb294005ddfbb99192440f8f268c3a6131e2969a601fe193b"
).catch((error) => {
  console.error(error);
  process.exit(1);
});
