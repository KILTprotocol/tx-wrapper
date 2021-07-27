import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingCancelLeaveCandidatesArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  candidate: string;
}

/**
 * cancel the leave action from the Candidates pool. When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function cancelLeaveCandidates(
  args: StakingCancelLeaveCandidatesArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "cancelLeaveCandidates",
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
