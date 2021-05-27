import { types9 as kiltDefinitions } from "@kiltprotocol/type-definitions";
import { RegistryTypes } from "@polkadot/types/types";
import { methods as substrateMethods } from "@substrate/txwrapper-substrate";
import {
  getRegistryBase,
  GetRegistryOptsCore,
  getSpecTypes,
  TypeRegistry,
} from "@substrate/txwrapper-core";

// Exporting relative methods
// Possibly more to be added in the future
export const methods = {
  balances: substrateMethods.balances,
  utility: substrateMethods.utility,
  session: substrateMethods.session,
  democracy: substrateMethods.democracy,
};

// Adding all the core as an export
export * from "@substrate/txwrapper-core";

// KILT registry

// As a convenience to users we can provide them with hardcoded chain properties
// as these rarely change.
/**
 * `ChainProperties` for networks that txwrapper-KILT supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
const KNOWN_CHAIN_PROPERTIES = {
  mashnet: {
    ss58Format: 38,
    tokenDecimals: 15,
    tokenSymbol: "KILT",
  },
};

// We override the `specName` property of `GetRegistryOptsCore` in order to get narrower type specificity,
// hopefully creating a better experience for users.
/**
 * Options for the `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
  specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}

/**
 * Get a type registry for networks that txwrapper-foo supports.
 *
 * @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
 */
export function getRegistry({
  specName,
  chainName,
  specVersion,
  metadataRpc,
  properties,
}: GetRegistryOpts): TypeRegistry {
  const registry = new TypeRegistry();
  registry.setKnownTypes({
    types: (kiltDefinitions as unknown) as RegistryTypes,
  });

  return getRegistryBase({
    chainProperties: properties || KNOWN_CHAIN_PROPERTIES[specName],
    specTypes: getSpecTypes(registry, chainName, specName, specVersion),
    metadataRpc,
  });
}
