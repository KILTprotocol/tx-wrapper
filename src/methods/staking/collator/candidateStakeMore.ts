import {
	Args,
	BaseTxInfo,
	defineMethod,
	OptionsWithMeta,
	UnsignedTransaction,
} from '@substrate/txwrapper-core'

export interface StakingCandidateStakeMoreArgs extends Args {
	/**
	 * The SS-58 encoded Candidates address.
	 */
	candidate: string
	/**
	 * Increased stake amount.
	 */
	more: string
}

/**
 * Stake more funds for a collator candidate.
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function candidateStakeMore(
	args: StakingCandidateStakeMoreArgs,
	info: BaseTxInfo,
	options: OptionsWithMeta
): UnsignedTransaction {
	return defineMethod(
		{
			method: {
				args,
				name: 'candidateStakeMore',
				pallet: 'parachainStaking',
			},
			...info,
		},
		options
	)
}