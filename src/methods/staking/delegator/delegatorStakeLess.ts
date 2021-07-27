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
  candidate: string;
  /**
   * Decrease amount staked.
   */
  less: string;
}

/**
 * Reduce the stake for delegating a collator candidate
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
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
