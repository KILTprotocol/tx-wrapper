import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { candidateStakeMore } from "./candidateStakeMore";
describe("staking collator increases staked amount", () => {
  it("should work", () => {
    const unsigned = candidateStakeMore(
      TEST_METHOD_ARGS.staking.collator.candidateStakeMore,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a0b0080c6a47e8d03000000000000000000");
  });

  it("should take candidate stake more", () => {
    const unsignedCandidateStakeMore = candidateStakeMore(
      TEST_METHOD_ARGS.staking.collator.candidateStakeMore,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );
  });
});
