import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import { cancelLeaveCandidates } from "./cancelLeaveCandidates";

describe("staking collator leave candidates", () => {
  it("should work", () => {
    const unsigned = cancelLeaveCandidates(
      TEST_METHOD_ARGS.staking.collator.cancelLeaveCandidates,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a0a");
  });

  it("should take cancel leave candidate", () => {
    const unsignedCancelLeave = cancelLeaveCandidates(
      TEST_METHOD_ARGS.staking.collator.cancelLeaveCandidates,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );
  });
});
