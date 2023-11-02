import { createContext, ReactNode, useCallback } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';
import { getCurrentChainId } from '../../constants/chains.ts';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const Web3Context = createContext({});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  const getRPCURL = useCallback((chainID: number) => {
    switch (chainID) {
      case 1:
        return 'https://eth.llamarpc.com';
      case 56:
        return 'https://bsc-dataseed.binance.org/';
      case 97:
        return 'https://data-seed-prebsc-1-s1.binance.org:8545/';
      default:
        return 'https://bsc-dataseed.binance.org/';
    }
  }, []);

  const { chains, publicClient } = configureChains(
    [getCurrentChainId() === 1 ? mainnet : bscTestnet],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: getRPCURL(chain.id),
        }),
      }),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: 'ALICE',
    projectId: '76b32982e9b97ae09f81d531761798ba',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: '#4D3E9E',
          accentColorForeground: '#FFFFFF',
        })}
      >
        <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export { Web3Provider, Web3Context };
