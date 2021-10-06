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

async function bulkTransfers(
	transfers: Transferables[],
	identity: string
): Promise<string> {
	await cryptoWaitReady()

	const keyring = new Keyring()

	const sender = keyring.addFromMnemonic(identity, undefined, 'sr25519')
	const { block } = await rpcToLocalNode('chain_getBlock')
	const blockHash = await rpcToLocalNode('chain_getBlockHash')
	const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0])
	const metadataRpc = await rpcToLocalNode('state_getMetadata')
	const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
		'state_getRuntimeVersion'
	)

	const accountNonce = await rpcToLocalNode('system_accountNextIndex', [
		deriveAddress(sender.publicKey, 38),
	])

	const registry = getRegistry({
		chainName: 'kilt-spiritnet',
		specName,
		specVersion,
		metadataRpc,
	})

	const transferables = transfers.map((txInfo: Transferables) => {
		const tx = methods.balances.transferKeepAlive(
			{ dest: txInfo.address, value: txInfo.amount.toString() },
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
		return tx.method
	})

	const unsigned = methods.utility.batchAll(
		{ calls: transferables },
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
	console.log(`\nTransaction to Submit: ${signed}`)

	const expectedTxHash = construct.txHash(signed)
	console.log(`\nExpected Tx Hash: ${expectedTxHash}`)

	const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [signed])
	console.log(`Actual Tx Hash: ${actualTxHash}`)

	return expectedTxHash
}

bulkTransfers(
	accountList,
	'inject lucky razor neglect mushroom regret area soldier bacon pyramid want enter'
).catch((error) => {
	console.error(error)
	process.exit(1)
})
