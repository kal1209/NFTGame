import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import React, { useMemo } from 'react';


import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';


// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '393px',
  md: '744px',
  lg: '1024px',
  xl: '1440px',
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

const colors = {
  body: {
    text: '#ffffff',
  },
  primary: {
    50: "#FFF0F0"
  }
}

const semanticTokens = {
  colors: {
    "chakra-body-text": {
      _light: "white",
      _dark: "white",
    },
  }
}

const components = {
  Text: {
    baseStyle: {
      fontWeight: '400',
      lineHeight: '27.5px',
      fontSize: '16px',
    },
  },
  Button: {
    baseStyle: {
      background: 'none',
      bgGradient: 'linear(to-r, #0B58EC 3.85%, #EC0BD5 100%)',
      borderRadius: '23px',
      _hover: {
        background: 'none',
        bgGradient: 'linear(to-r, #0B58EC 3.85%, #EC0BD5 100%)',
        boxShadow: '0px 0px 39px 7px rgba(89, 0, 235, 0.78)',
      }
    },
  }
};

const theme = extendTheme({
  breakpoints, styles, fonts, colors, semanticTokens, components
})



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
