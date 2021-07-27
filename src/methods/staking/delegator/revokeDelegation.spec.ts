import { itHasCorrectBaseTxInfo } from "../../../tests/itHasCorrectBaseTxInfo";
import {
  TEST_BASE_TX_INFO,
  TEST_METHOD_ARGS,
  MASHNET_NODE_TEST_OPTIONS,
} from "../../../tests/constants";
import { revokeDelegation } from "./revokeDelegation";
describe("staking terminates an ongoing delegation for a given collator candidate", () => {
  it("should work", () => {
    const unsigned = revokeDelegation(
      TEST_METHOD_ARGS.staking.delegator.revokeDelegation,
      TEST_BASE_TX_INFO,
      MASHNET_NODE_TEST_OPTIONS
    );

    itHasCorrectBaseTxInfo(unsigned);
    expect(unsigned.method).toBe(
      "0x0a1000921cbc0ffe09a865dbf4ae1d0410aa17c656881fe86666da0f97939e3701b674"
    );
  });
});
