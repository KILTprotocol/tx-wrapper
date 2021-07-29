import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Keyring } from '@polkadot/api'
import { getRegistry, methods } from '../index'
import { rpcToLocalNode, signWith } from '../util'
import { deriveAddress, construct } from '@substrate/txwrapper-polkadot'
import accountList from '../tests/accountList'

type Transferables = {
	seed: string
	address: string
	amount: number
}

async function multiAccountTransfers(transfers: Transferables[]) {
	await cryptoWaitReady()

	const { block } = await rpcToLocalNode('chain_getBlock')
	const blockHash = await rpcToLocalNode('chain_getBlockHash')
	const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0])
	const metadataRpc = await rpcToLocalNode('state_getMetadata')
	const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
		'state_getRuntimeVersion'
	)

	return transfers.map(async ({ seed, address, amount }) => {
		const keyring = new Keyring()
		const sender = keyring.addFromMnemonic(seed, undefined, 'sr25519')

		const accountNonce = await rpcToLocalNode('system_accountNextIndex', [
			deriveAddress(sender.publicKey, 38),
		])

		const registry = getRegistry({
			chainName: 'mashnet-node',
			specName,
			specVersion,
			metadataRpc,
		})

		const unsigned = methods.balances.transferKeepAlive(
			{ dest: address, value: amount.toString() },
			{
				address: deriveAddress(sender.publicKey, 38),
				blockHash,
				blockNumber: registry
					.createType('BlockNumber', block.header.number)
					.toNumber(),
				eraPeriod: 64,
				genesisHash,
				metadataRpc,
				nonce: accountNonce,
				specVersion,
				tip: 0,
				transactionVersion,
			},
			{
				metadataRpc,
				registry,
			}
		)

		const signingPayload = construct.signingPayload(unsigned, {
			registry,
		})

		const signature = signWith(sender, signingPayload, {
			metadataRpc,
			registry,
		})

		const signed = construct.signedTx(unsigned, signature, {
			metadataRpc,
			registry,
		})

		return signed
	})
}

async function finished(val: any) {
	await cryptoWaitReady()

	val.map(async (signed: string) => {
		const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [
			signed,
		])
		console.log('Actually the txHash', actualTxHash)
	})
}

multiAccountTransfers(accountList)
	.then((val) => finished(val))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
