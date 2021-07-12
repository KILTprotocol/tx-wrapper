import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingJoinCandidatesArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  Candidate: string;
  /**
   * The Ammount the collator candidate wants to Stake.
   */
  Stake: string;
}

/**
 * (Re-)join the Candidates pool. when does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function joinCandidates(
  args: StakingJoinCandidatesArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "joinCandidates",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}
