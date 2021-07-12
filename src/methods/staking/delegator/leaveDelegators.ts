import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingLeaveDelegatorsArgs extends Args {
  /**
   * The SS-58 encoded Delegators address.
   */
  Delegators: string;
}

/**
 * cancel the leave action from the Delegators pool. When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function leaveDelegators(
  args: StakingLeaveDelegatorsArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "leaveDelegators",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}
