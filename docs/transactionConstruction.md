# Offline Transaction Guide

The following will describe the steps to create, sign and submit the transaction. The transaction follows the Polkadot construction and signing formats.

## Transaction Format

Polkadot has some basic transaction information that is common to all transactions.

- Address: The SS58-encoded address of the sending account.
- Block Hash: The hash of the checkpoint block.
- Block Number: The number of the checkpoint block.
- Genesis Hash: The genesis hash of the chain.
- Metadata: The SCALE-encoded metadata for the runtime when submitted.
- Nonce: The nonce for this transaction.\*
- Spec Version: The current spec version for the runtime.
- Transaction Version: The current version for transaction format.
- Tip: Optional, the tip to increase transaction priority.
- Era Period: Optional, the number of blocks after the checkpoint for which a transaction is valid. If zero, the transaction is immortal.

\*The nonce queried from the System module does not account for pending transactions. You must track and increment the nonce manually if you want to submit multiple valid transactions at the same time.

Each transaction will have its own (or no) parameters to add. For example, the transferKeepAlive function from the Balances pallet will take:

- dest: Destination address
- #[compact] value: Number of tokens (compact encoding)

Once you have all the necessary information, you will need to:

1. Construct an unsigned transaction.
2. Create a signing payload.
3. Sign the payload.
4. Serialize the signed payload into a transaction.
5. Submit the serialized transaction.
   
   Parity provides the following tools to help perform these steps.

## KILT TX-Wrapper

Parity provides the methods to generate and sign transactions.

### Import a private key

```JS
import { Keyring } from "@polkadot/api";

const keypair = keyring.addFromMnemonic(
    "negative chalk resemble grant .... during endorse monkey",
    { name: "User" },
    "sr25519"
  );
```

### Derive an address from a public key

```JS
import { deriveAddress } from '@substrate/txwrapper-polkadot';

// Public key, can be either hex string, or Uint8Array
const publicKey = "0x6227c9501ea7f00309b32ba6661772fc3b8d3f09b73991f19b8a800699f34c6c";
const address = deriveAddress(publicKey, 38); // Including KILT's prefix 38 to derive an address
```

### Construct a transaction offline

```JS
import { methods } from "./index";

const unsigned = methods.balances.transferKeepAlive(
  {
    dest: "4qbpqorBUa6mjbYGbCXMkmE7TECmdRY9dVX8ujMvBDMoQBXv",
    value: 500000000000,
  },
  {
    address: "4q8mLP1sLinfM7Q7DEWokFkAqGJxJScFJiMozgc1o4JFWs22",
    blockHash: "0x13....93f3c1e9ac743",
    blockNumber: 4302222,
    genesisHash: "0x34....6fab4ae1b582",
    metadataRpc, // must import from client RPC call state_getMetadata
    nonce: 2,
    specVersion: 1019,
    tip: 0,
    eraPeriod: 64, // number of blocks from checkpoint that transaction is valid
    transactionVersion: 1,
  },
  {
    metadataRpc,
    registry, // Type registry
  }
);
```

### Construct a siging payload

```JS
import { methods, construct } from '@substrate/txwrapper-polkadot';

// See "Construct a transaction offline" for "{...}"
const unsigned = methods.balances.transferKeepAlive({...}, {...}, {...});
// Takes the unsigned transaction using the polkadot signing payload to construct the signingPayload
const signingPayload = construct.signingPayload(unsigned, { registry });
```

### Signing a Payload offline

```JS
  // Sign a payload. This operation should be performed on an offline device.
const signature = signWith(alice, signingPayload, {
    metadataRpc,
    registry,
  });

```

### Decode payload types

You may want to decode payloads to verify their contents prior to submission.

```JS
import { decode } from "@substrate/txwrapper-polkadot";

// Decode an unsigned tx
const txInfo = decode(unsigned, { metadataRpc, registry });

// Decode a signing payload
const txInfo = decode(signingPayload, { metadataRpc, registry });

// Decode a signed tx
const txInfo = decode(signedTx, { metadataRpc, registry });
```

### Check a transaction's hash

```JS
import { construct } from "@substrate/txwrapper-polkadot";
// Calculate the tx hash of the signed transaction offline.
const expectedTxHash = construct.txHash(tx);
```

## Submitting a signed payload

Using [Substrate API sidecar](https://github.com/paritytech/substrate-api-sidecar) to submit a signed payload.
