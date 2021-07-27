import { getRegistry } from "../index";
import metadataRpc from "./metadataRpc";
/**
 * Base tx information common to all tested transactions
 */
export const TEST_BASE_TX_INFO = {
  address: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB", // Random address
  blockHash:
    "0x4fe0511d393bb6d96c36e1edcf5ec52f007d3c4b916c8e3002f671a80acea8ea",
  blockNumber: 58362,
  eraPeriod: 64,
  genesisHash:
    "0xf25c85c4ffc4863b599a443e5301f7f4120c9a21042d35942b9e844346060db1",
  metadataRpc,
  nonce: 2,
  specVersion: 16,
  tip: 0,
  transactionVersion: 2,
};
/**
 * Test options for runtime v16
 */
export const MASHNET_NODE_TEST_OPTIONS = {
  metadataRpc,
  registry: getRegistry({
    chainName: "mashnet-node",
    specName: "mashnet-node",
    specVersion: 16,
    metadataRpc,
  }),
};

/**
 * Dummy arguments for all methods we're testing.
 */
export const TEST_METHOD_ARGS = {
  staking: {
    collator: {
      cancelLeaveCandidates: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
      },
      candidateStakeLess: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        less: "1000000000000000",
      },
      candidateStakeMore: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        more: "1000000000000000",
      },
      executeLeaveCandidates: {
        collator: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
      },
      initLeaveCandidates: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
      },
      joinCandidates: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        stake: "1000000000000000",
      },
    },
    delegator: {
      delegateAnotherCandidate: {
        collator: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        amount: "1000000000000000",
      },
      delegatorStakeLess: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        less: "1000000000000000",
      },
      delegatorStakeMore: {
        candidate: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        more: "1000000000000000",
      },
      joinDelegators: {
        collator: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
        amount: "1000000000000000",
      },
      leaveDelegators: {
        delegator: "4smcAoiTiCLaNrGhrAM4wZvt5cMKEGm8f3Cu9aFrpsh5EiNV",
      },
      revokeDelegation: {
        delegator: "4smcAoiTiCLaNrGhrAM4wZvt5cMKEGm8f3Cu9aFrpsh5EiNV",
        collator: "4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB",
      },
    },
  },
};
