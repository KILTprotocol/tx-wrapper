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
  delegator: string;
  /**
   * The SS-58 encoded Collators address.
   */
  collator: string;
}

/**
 * Terminates an ongoing delegation for a given collator candidate
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
        name: "revokeDelegation",
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
