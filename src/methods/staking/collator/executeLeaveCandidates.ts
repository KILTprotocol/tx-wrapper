import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingExecuteLeaveCandidatesArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  collator: string;
}

/**
 * Once the candidate has been removed they are able to execute the off boarding a candidate from the candidate pool.
 *  when does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function executeLeaveCandidates(
  args: StakingExecuteLeaveCandidatesArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "executeLeaveCandidates",
        pallet: "parachainStaking",
      },
      ...info,
    },
    options
  );
}
