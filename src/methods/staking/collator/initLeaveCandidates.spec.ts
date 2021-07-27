import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { initLeaveCandidates } from "./initLeaveCandidates";
describe("staking, collator request to leave the set of collator candidates", () => {
  it("should work", () => {
    const unsigned = initLeaveCandidates(
      TEST_METHOD_ARGS.staking.collator.initLeaveCandidates,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a08");
  });
});
