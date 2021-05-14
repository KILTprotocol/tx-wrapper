# Offline Transaction Guide

The following will describe the steps to create, sign and submit the transaction. The transaction follows the Polkadot construction and signing formats.

## Transaction Format

Polkadot has some basic transaction information that is common to all transactions.

* Address: The SS58-encoded address of the sending account.
* Block Hash: The hash of the checkpoint block.
* Block Number: The number of the checkpoint block.
* Genesis Hash: The genesis hash of the chain.
* Metadata: The SCALE-encoded metadata for the runtime when submitted.
* Nonce: The nonce for this transaction.*
* Spec Version: The current spec version for the runtime.
* Transaction Version: The current version for transaction format.
* Tip: Optional, the tip to increase transaction priority.
* Era Period: Optional, the number of blocks after the checkpoint for which a transaction is valid. If zero, the transaction is immortal.

*The nonce queried from the System module does not account for pending transactions. You must track and increment the nonce manually if you want to submit multiple valid transactions at the same time.

Each transaction will have its own (or no) parameters to add. For example, the transferKeepAlive function from the Balances pallet will take:

* dest: Destination address
* #[compact] value: Number of tokens (compact encoding)

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
import { importPrivateKey } from '@substrate/txwrapper';

const keypair = importPrivateKey(“pulp gaze fuel ... mercy inherit equal”);
```

### Derive an address from a public key

```JS
import { deriveAddress } from '@substrate/txwrapper';

// Public key, can be either hex string, or Uint8Array
const publicKey = “0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235”;
const address = deriveAddress(publicKey);
```

### Construct a transaction offline

```JS
import { methods } from "@substrate/txwrapper";

const unsigned = methods.balances.transferKeepAlive(
  {
    dest: "15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y",
    value: 500000000000,
  },
  {
    address: "121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2",
    blockHash: "0x1fc7493f3c1e9ac758a183839906475f8363aafb1b1d3e910fe16fab4ae1b582",
    blockNumber: 4302222,
    genesisHash: "0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
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
import { methods, createSigningPayload } from '@substrate/txwrapper';

// See "Construct a transaction offline" for "{...}"
const unsigned = methods.balances.transferKeepAlive({...}, {...}, {...});
const signingPayload = createSigningPayload(unsigned, { registry });
```

### Serialise a signed transaction

```JS
import { createSignedTx } from "@substrate/txwrapper";

// Example code, replace `signWithAlice` with actual remote signer.
// An example is given here:
// https://github.com/paritytech/txwrapper/blob/630c38d/examples/index.ts#L50-L68
const signature = await signWithAlice(signingPayload);
const signedTx = createSignedTx(unsigned, signature, { metadataRpc, registry });
```

### Decode payload types

You may want to decode payloads to verify their contents prior to submission.

```JS
import { decode } from "@substrate/txwrapper";

// Decode an unsigned tx
const txInfo = decode(unsigned, { metadataRpc, registry });

// Decode a signing payload
const txInfo = decode(signingPayload, { metadataRpc, registry });

// Decode a signed tx
const txInfo = decode(signedTx, { metadataRpc, registry });
```

### Check a transaction's hash

```JS
import { getTxHash } from ‘@substrate/txwrapper’;
const txHash = getTxHash(signedTx);
```

## Submitting a signed payload

Using [Substrate API sidecar](https://github.com/paritytech/substrate-api-sidecar) to submit a signed payload.
