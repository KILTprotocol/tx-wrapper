import json
import subprocess
import random
import sys

MAX_REPETITION = 100


def create_account():
    cmd = "subkey generate -n kilt --output-type json"
    identity = subprocess.run(cmd, capture_output=True, check=True, shell=True)
    return json.loads(identity.stdout)


if __name__ == "__main__":
    account_list = []
    for i in range(MAX_REPETITION):
        account = create_account()
        money = random.randint(10**15, 10**18)
        listedAccount = {
            "seed": account["secretSeed"],
            "address": account["ss58Address"],
            "amount": money
        }
        account_list.append(listedAccount)
    with open(sys.argv[1], 'w') as f:
        json.dump(account_list, f, indent="  ")
        pass
