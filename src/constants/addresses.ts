import { SupportedChainId } from './chains.ts';

export type AddressMap = { [chainId: number]: `0x${string}` };

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTICALL_ADDRESS: AddressMap = {};

export const ALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xF43CD517385237fe7A48927073151D12f4eADC53',
};

export const BONALICE_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x834b6cE191BaB7F724983357eCD98EC1929A441a',
};

export const LP_TOKEN_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x998977f47C5eb2e8bC696815718B91140E307fC9',
};

export const REWARD_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0x50dB73A29349a37b496cA451E8D295Ee6C4265C0',
};

export const MUON_NODE_STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.BSCTESTNET]: '0xcF7b4F6cb896cf6BaD5E32b2ef12DC26B381AE4e',
};
