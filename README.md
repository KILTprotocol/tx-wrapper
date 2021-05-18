# KILT tx-wrapper

Tooling to generate KILT offline transactions.

## Overview

The library provides end-users a complete workflow to create offline transactions. 
The transaction can be combined with the [substrate-sidecart](https://paritytech.github.io/substrate-api-sidecar/dist/) to submit the transactions to the KILT node.


## How to install `tx-wrapper`

Install dependencies

```JS
yarn install
```

Build the library

```JS
yarn run build
```

### End user example

[An example of a transfer transaction from constructing, signing and decoding the transaction.](docs/example.md)

## Transaction Construction

[Click here to follow the transaction construction guide to use to swap out the individual methods we expose](docs/transactionConstruction.md)