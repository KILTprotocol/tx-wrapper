import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { candidateStakeLess } from "./candidateStakeLess";

describe("staking, stake less funds for a collator candidate", () => {
  it("should work", () => {
    const unsigned = candidateStakeLess(
      TEST_METHOD_ARGS.staking.collator.candidateStakeLess,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a0c0080c6a47e8d03000000000000000000");
  });
});
