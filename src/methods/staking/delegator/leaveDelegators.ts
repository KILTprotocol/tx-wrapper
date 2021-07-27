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
  delegator: string;
}

/**
 * Leave the set of delegators and, by implication, revoke all ongoing delegations.
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
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
