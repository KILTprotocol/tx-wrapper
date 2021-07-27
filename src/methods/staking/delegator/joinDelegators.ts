import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingJoinDelegatorsArgs extends Args {
  /**
   * The SS-58 encoded Collators address.
   */
  collator: string;
  /**
   * Amount staked.
   */
  amount: string;
}

/**
 * Account joins the delegators and selects a collator to stake on.
 * When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function joinDelegators(
  args: StakingJoinDelegatorsArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "joinDelegators",
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
