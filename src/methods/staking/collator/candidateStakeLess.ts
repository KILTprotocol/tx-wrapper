import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingCandidateStakeLessArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  Candidates: string;
  /**
   * Decreased stake amount.
   */
   LessStake: string;
}

/**
 * Candidate that has joined can stake less, but not below the minimum. When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function candidateStakeLess(
  args: StakingCandidateStakeLessArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "candidateStakeLess",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}
