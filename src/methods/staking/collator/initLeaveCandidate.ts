import {
  Args,
  BaseTxInfo,
  defineMethod,
  OptionsWithMeta,
  UnsignedTransaction,
} from "@substrate/txwrapper-core";

export interface StakingInitLeaveCandidateArgs extends Args {
  /**
   * The SS-58 encoded Candidates address.
   */
  Candidates: string;
}

/**
 *  Initiates the process of off boarding a candidate from the candidate pool, a candidate can't leave if only 4 collators are currently collating. when does it come into effect?
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function initLeaveCandidate(
  args: StakingInitLeaveCandidateArgs,
  info: BaseTxInfo,
  options: OptionsWithMeta
): UnsignedTransaction {
  return defineMethod(
    {
      method: {
        args,
        name: "initLeaveCandidate",
        pallet: "staking",
      },
      ...info,
    },
    options
  );
}
