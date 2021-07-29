# Example for end-user offline transaction

## How to use `KILT tx-wrapper`

The following tutorial interacts with the production KILT chain. We are using the KILT production chain (<https://github.com/KILTprotocol/mashnet-node/tree/master>).

### Starting

1. fetch the latest KILT node from the link above. Follow the intstructions to build and start a dev version of the chain.

```shell
cargo run --release -p mashnet-node -- --tmp --dev --ws-port 9944 --port 30444 --alice --ws-external --rpc-external --rpc-cors all --rpc-methods=unsafe
```

2. Install dependencies

```shell
yarn install
```

3. Build

```shell
yarn run build
```

4. Run the example script. It will interact with your local node.

```shell
yarn run kilt
```

### Expected Outcome

The script will output something similar to the following. The value's will differ.

```shell
Alices SS58-Encoded Address: 4r1WkS3t8rbCb11H8t3tJvGVCynwDXSUBiuGB6sLRHzCLCjs

Decoded Transaction
  To: 4sejigvu6STHdYmmYf2SuN92aNp8TbrsnBBDUj7tMrJ9Z3cG 
  Amount: 90071992547409910

Payload to Sign: 0xac0600d17c2d7823ebf260fd138f2d7e27d114c0145d968b5ff5006125f2414fadae6913f6ffffffffff3f01150100000800000002000000b0a7ed308ee3d3a1ade33110ee16a9e250569aba73215bdba9d43f11f4a19af2fa546fa6858119285211ed825095d163d4a7de50e2d1e9fe2110ab1ea035bb08

Decoded Transaction
  To: 4sejigvu6STHdYmmYf2SuN92aNp8TbrsnBBDUj7tMrJ9Z3cG
  Amount: 90071992547409910

Signature: 0x0010ded71c9f25ad5a617b71efaa7ce5eddb50f001fd7e0327ec627bf7f0e9c9e4da4d15b630d03fdee83304669e02214c9e38e42ab942191098a7a68ca48dff0c

Transaction to Submit: 0x45028488dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee0010ded71c9f25ad5a617b71efaa7ce5eddb50f001fd7e0327ec627bf7f0e9c9e4da4d15b630d03fdee83304669e02214c9e38e42ab942191098a7a68ca48dff0c150100000600d17c2d7823ebf260fd138f2d7e27d114c0145d968b5ff5006125f2414fadae6913f6ffffffffff3f01

Expected Tx Hash: 0x716256b64a5ab294ad514b95d2088922b8cc307e014ae305c9c4b30e54efecc0
Actual Tx Hash: 0x716256b64a5ab294ad514b95d2088922b8cc307e014ae305c9c4b30e54efecc0

Decoded Transaction
  To: 4sejigvu6STHdYmmYf2SuN92aNp8TbrsnBBDUj7tMrJ9Z3cG
  Amount: 90071992547409910
```

### Offline vs Online

In the example, the `rpcToLocalNode` function is the only function that needs to be called with internet access. Everything else can be performed offline. In particular, this example shows how to perform the following operations offline:

* Generate a tx
* Create its signing payload
* Sign the signing payload
* Derive the tx hash
* Decode at various points in the tx lifecycle
