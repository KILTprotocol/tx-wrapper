import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { joinCandidates } from "./joinCandidates";
describe("staking, join the set of collator candidates", () => {
  it("should work", () => {
    const unsigned = joinCandidates(
      TEST_METHOD_ARGS.staking.collator.joinCandidates,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a070080c6a47e8d03000000000000000000");
  });
});
