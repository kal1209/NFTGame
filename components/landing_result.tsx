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
  CircularProgress
} from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { ImCross, ImCheckmark } from 'react-icons/im';

import { Wallet } from '../components/wallet';
import { LandingStateProps } from './landing';
import { 
  getConnection,
  getProgram,
  getBetPda,
  getConfigPda,
  getFeePda
} from '../lib/utils';

import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { SmartContract } from "../lib/sc/types/smart_contract";
import idl from '../lib/sc/idl/smart_contract.json';
import * as web3 from "@solana/web3.js";
import bs58 from 'bs58';

// FIXME: Change to ENV variable
const PREFIX_BET = "coinflip_bet";
const PREFIX_CONFIG = "coinflip_config";
// @ts-ignore
const SMART_CONTRACT_ID = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_SMART_CONTRACT_ID);
// @ts-ignore
const CLUSTER = process.env.NEXT_PUBLIC_NODE_CLUSTER as string;



export const LandingResult: React.FunctionComponent<LandingStateProps> = (props) => {

  const toast = useToast();
  const { wallet, publicKey, signTransaction, connected, disconnect } = useWallet();
  const aWallet = useAnchorWallet();

  const [betResult, setBetResult] = React.useState(2);
  const [isFinished, setIsFinished] = React.useState(false);


  const finalize = async () => {

    if (!publicKey) {
      return;
    }

    console.log('publicKey')
    console.log(publicKey.toBase58())

    // call backend to finalize the bet
    let url = `/api/bet/${publicKey?.toBase58()}`;
    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      props.triggerReload(t=>!t);
    })
    .catch(err => {
      console.error(err);
    })
  }

  const fetchBetResult = async () => {
    if (!publicKey || !signTransaction || !aWallet) {
      return;
    }

    if (isFinished) {
      return;
    }

    const program = await getProgram(CLUSTER, aWallet, publicKey);
    const { _bet_pda, _bump } = await getBetPda(program, publicKey);

    const bet_account = await program.account.betAccount.fetch(_bet_pda);
    const bet_made = bet_account.bet;
    const bet_result = bet_account.result;

    // @ts-ignore 
    if (bet_made.eq(bet_result)) {
      setBetResult(1);
    } else {
      setBetResult(0);
    }
  }

  useEffect(() => {
    const init = async () => {
      // wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 250));
      await fetchBetResult();

      await new Promise(resolve => setTimeout(resolve, 250));
      if (!isFinished && betResult === 2) {
        await finalize();
        setIsFinished(true);

        await new Promise(resolve => setTimeout(resolve, 500));
        props.triggerReload(t=>!t);
      }

      // // wait for 1 seconds
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // await finalize();
    }

    init();
  }, [publicKey, isFinished, betResult]);

  return (
    <Flex justifyContent={'center'}>
      <VStack>
        {betResult === 2 && (<CircularProgress size='200px' isIndeterminate color='green.300' />)}
        {betResult === 1 && (<IconContext.Provider value={{color: 'green', size: '150px'}}><ImCheckmark /></IconContext.Provider>)}
        {betResult === 0 && (<IconContext.Provider value={{color: 'red', size: '150px'}}><ImCross /></IconContext.Provider>)}

        <Box mb={16}>
          {
            publicKey
              ?
              <VStack spacing={4}>

                {(betResult === 2) && (<Text>Fetching result on chain...</Text>)}
                {(betResult === 1) && (
                  <VStack w='full' spacing={4}>
                    <Text>YOU WIN</Text>
                    <Text color={'green'}>{props.betAmount * 2} SOL</Text>
                    <Box p={4} bg='green.400' borderRadius={'md'}>
                    <Text w='full' fontWeight={'bold'}>
                      You have already received your winnings!
                    </Text>
                    </Box>
                    {/* <Button
                      w='full' colorScheme={'green'} px={8} py={2}
                      onClick={finalize}
                    >
                      Receive your rewards
                    </Button> */}
                    <Button onClick={() => props.setStep('connected')}>Try again</Button>
                  </VStack>
                )}
                {(betResult === 0) && (
                  <VStack>
                    <Text>YOU LOOSE</Text>
                    <Text color='red'>{props.betAmount} SOL</Text>
                    <Text w='full' borderTopWidth={2}>
                      You have lost your bet
                    </Text>
                    <Button onClick={() => props.setStep('connected')}>Try again</Button>
                  </VStack>
                )}
              </VStack>
              : <Wallet />
          }
        </Box>
      </VStack>
    </Flex>

  )
}