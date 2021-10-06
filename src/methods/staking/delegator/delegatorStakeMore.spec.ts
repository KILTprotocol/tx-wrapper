import { itHasCorrectBaseTxInfo } from '../../../tests/itHasCorrectBaseTxInfo'
import {
	TEST_BASE_TX_INFO,
	TEST_METHOD_ARGS,
	MASHNET_NODE_TEST_OPTIONS,
} from '../../../tests/constants'
import { delegatorStakeMore } from './delegatorStakeMore'
describe('staking, increase the stake for delegating a collator candidate', () => {
	it('should work', () => {
		const unsigned = delegatorStakeMore(
			TEST_METHOD_ARGS.staking.delegator.delegatorStakeMore,
			TEST_BASE_TX_INFO,
			MASHNET_NODE_TEST_OPTIONS
		)

		itHasCorrectBaseTxInfo(unsigned)
		expect(unsigned.method).toBe(
			'0x0a1100921cbc0ffe09a865dbf4ae1d0410aa17c656881fe86666da0f97939e3701b6740080c6a47e8d03000000000000000000'
		)
	})
})