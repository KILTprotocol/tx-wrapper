import { itHasCorrectBaseTxInfo } from '../../../tests/itHasCorrectBaseTxInfo'
import {
	TEST_BASE_TX_INFO,
	TEST_METHOD_ARGS,
	MASHNET_NODE_TEST_OPTIONS,
} from '../../../tests/constants'
import { executeLeaveCandidates } from './executeLeaveCandidates'
describe('staking, collator executes the network exit of a candidate who requested to leave', () => {
	it('should work', () => {
		const unsigned = executeLeaveCandidates(
			TEST_METHOD_ARGS.staking.collator.executeLeaveCandidates,
			TEST_BASE_TX_INFO,
			MASHNET_NODE_TEST_OPTIONS
		)

		itHasCorrectBaseTxInfo(unsigned)
		expect(unsigned.method).toBe(
			'0x0a0900921cbc0ffe09a865dbf4ae1d0410aa17c656881fe86666da0f97939e3701b674'
		)
	})
})
