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
  candidate: string;
  /**
   * The Ammount the collator candidate wants to Stake.
   */
  stake: string;
}

/**
 * Join the set of collator candidates by staking at least minimum
 * candidate stake and at most maximum candidate stake.
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
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
