import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { leaveDelegators } from "./leaveDelegators";
describe("staking, leave the set of delegators and, by implication, revoke all ongoing delegations", () => {
  it("should work", () => {
    const unsigned = leaveDelegators(
      TEST_METHOD_ARGS.staking.delegator.leaveDelegators,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe("0x0a0f");
  });
});
