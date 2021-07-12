import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingDelegatorStakeMoreArgs extends Args {
  /**
   * The SS-58 encoded Delegators address.
   */
  Delegators: string;
  /**
   * The SS-58 encoded Collators address.
   */
  Collators: string;
  /**
   * Increase amount staked.
   */
  MoreStake: string;
}

/**
 * Delegator increases the stake on a collator, but can't stake more the maximum amount.
 * When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function delegatorStakeMore(
  args: StakingDelegatorStakeMoreArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "delegatorStakeMore",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}
