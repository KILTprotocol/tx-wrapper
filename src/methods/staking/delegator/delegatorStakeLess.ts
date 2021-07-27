import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingDelegatorStakeLessArgs extends Args {
  /**
   * The SS-58 encoded Delegators address.
   */
  Delegators: string;
  /**
   * The SS-58 encoded Delegators address.
   */
  Collators: string;
  /**
   * Decrease amount staked.
   */
  LessStake: string;
}

/**
 * Delegator decreases the stake on a collator, but can't stake less the minimum amount.
 * When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function delegatorStakeLess(
  args: StakingDelegatorStakeLessArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "delegatorStakeLess",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}