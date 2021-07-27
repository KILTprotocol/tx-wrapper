import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingExecuteLeaveCandidatesArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  collator: string;
}

/**
 * Executes the network exit of a candidate who requested to leave
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function executeLeaveCandidates(
  args: StakingExecuteLeaveCandidatesArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "executeLeaveCandidates",
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
