import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Flex,
  VStack,
  Image,
  HStack,
  Link,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { Wallet } from '../components/wallet';
import { LandingStateProps } from './landing';

import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';


export const LandingNotConnected: React.FunctionComponent<LandingStateProps> = (props) => {
  const toast = useToast();
  const { wallet, publicKey, signTransaction } = useWallet();
  const aWallet = useAnchorWallet();

  const [initBet, setInitBet] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      if (!publicKey) {
        return;
      }

    }

    init();
  }, [publicKey]);

  return (
    <Flex justifyContent={'center'}>
      <VStack>
      </VStack>
    </Flex>

  )
}