import {
	Args,
	BaseTxInfo,
	defineMethod,
	OptionsWithMeta,
	UnsignedTransaction,
} from '@substrate/txwrapper-core'

export interface StakingInitLeaveCandidatesArgs extends Args {
	/**
	 * The SS-58 encoded Candidates address.
	 */
	candidate: string
}

/**
 * Request to leave the set of collator candidates.
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function initLeaveCandidates(
	args: StakingInitLeaveCandidatesArgs,
	info: BaseTxInfo,
	options: OptionsWithMeta
): UnsignedTransaction {
	return defineMethod(
		{
			method: {
				args,
				name: 'initLeaveCandidates',
				pallet: 'parachainStaking',
			},
			...info,
		},
		options
	)
}
