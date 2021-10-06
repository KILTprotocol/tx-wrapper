import {
	Args,
	BaseTxInfo,
	defineMethod,
	OptionsWithMeta,
	UnsignedTransaction,
} from '@substrate/txwrapper-core'

export interface StakingDelegateAnotherCandidateArgs extends Args {
	/**
	 * The SS-58 encoded Collators address.
	 */
	collator: string
	/**
	 * Amount staked.
	 */
	amount: string
}

/**
 *  Delegate to another collator candidate by staking on them
 *
 * @param args - Arguments specific to this method.
 * @param info - Information required to construct the transaction.
 * @param options - Registry and metadata used for constructing the method.
 */
export function delegateAnotherCandidate(
	args: StakingDelegateAnotherCandidateArgs,
	info: BaseTxInfo,
	options: OptionsWithMeta
): UnsignedTransaction {
	return defineMethod(
		{
			method: {
				args,
				name: 'delegateAnotherCandidate',
				pallet: 'parachainStaking',
			},
			...info,
		},
		options
	)
}
