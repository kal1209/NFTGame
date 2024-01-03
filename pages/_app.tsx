import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import React, { FC, useMemo } from 'react';


import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';


// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1440px',
}

const styles = {
  global: () => ({
    body: {
      bg: '',
    }
  })
}

const fonts = {
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
    mono: 'Roboto, sans-serif',
  }
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints, styles, fonts })


function MyApp({ Component, pageProps }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  // To manage some of the user assets

  const userContextValue = {
  }

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            {/* <UserContext.Provider value={userContextValue} > */}
            <Component {...pageProps} />
            {/* </UserContext.Provider> */}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  )
}

export default MyApp
