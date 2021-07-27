import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingRevokeDelegatorsArgs extends Args {
  /**
   * The SS-58 encoded Delegators address.
   */
  Delegators: string;
  /**
   * The SS-58 encoded Collators address.
   */
   Collators: string;
}

/**
 * cancel the leave action from the Delegators pool. When does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function revokeDelegation(
  args: StakingRevokeDelegatorsArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "revokeDelegators",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}

