import {
	Args,
	BaseTxInfo,
	defineMethod,
	OptionsWithMeta,
	UnsignedTransaction,
} from '@substrate/txwrapper-core'

export interface StakingCandidateStakeLessArgs extends Args {
	/**
	 * The SS-58 encoded Candidates address.
	 */
	candidate: string
	/**
	 * Decreased stake amount.
	 */
	less: string
}

/**
 * Stake less funds for a collator candidate
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function candidateStakeLess(
	args: StakingCandidateStakeLessArgs,
	info: BaseTxInfo,
	options: OptionsWithMeta
): UnsignedTransaction {
	return defineMethod(
		{
			method: {
				args,
				name: 'candidateStakeLess',
				pallet: 'parachainStaking',
			},
			...info,
		},
		options
	)
}
