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
  useColorModeValue,
} from '@chakra-ui/react';

import { Wallet } from './wallet';
import { LandingStateProps } from './landing';
import {
  getConnection,
  getProgram,
  getBetPda,
  getConfigPda,
  getFeePda
} from '../lib/utils';
import bs58 from 'bs58';

import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SmartContract } from "../lib/sc/types/smart_contract";
import idl from '../lib/sc/idl/smart_contract.json';
import * as web3 from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


// @ts-ignore
const SMART_CONTRACT_ID = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_SMART_CONTRACT_ID);
// @ts-ignore
const FEE_WALLET = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_FEE_WALLET_PUBKEY);
// @ts-ignore
const CLUSTER = process.env.NEXT_PUBLIC_NODE_CLUSTER as string;


const PREFIX_BET = "coinflip_bet";
const PREFIX_CONFIG = "coinflip_config";
const PREFIX_FEE = "coinflip_fee";


const BetChoose: React.FC<{ choice: boolean, set: any }> = ({ choice, set }) => {
  const borderColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box>
      <Flex direction={"column"} w='full'>
        <Text mx='auto' fontWeight="bold" fontSize="2xl">I PICK</Text>
        <HStack w='full'>
          <Button w='full'
            colorScheme="gray"
            borderColor={choice ? borderColor : 'transparent'}
            borderWidth={2}
            onClick={() => set(true)}
          >HEADS</Button>
          <Button w='full'
            borderColor={choice ? 'transparent' : borderColor}
            borderWidth={2}
            onClick={() => set(false)}
          >TAILS</Button>
        </HStack>
      </Flex>
    </Box>
  )
}

const BetAmount: React.FC<{ amount: number, set: any }> = ({ amount, set }) => {
  const [selected, setSelected] = React.useState(0);

  const borderColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box>
      <Flex direction={'column'}>
        <Text mx='auto' fontWeight="bold" fontSize="2xl">FOR</Text>

        <VStack>
          <HStack w="full">
            <Button w='full'
              borderColor={selected === 0 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(0); set(5); }}
            >5 YOSK</Button>
            <Button w='full'
              borderColor={selected === 1 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(1); set(10); }}
            >10 YOSK</Button>
            <Button w='full'
              borderColor={selected === 2 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(2); set(25); }}
            >25 YOSK</Button>
          </HStack>
          <HStack w='full'>
            <Button w='full'
              borderColor={selected === 3 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(3); set(50); }}
            >50 YOSK</Button>
            <Button w='full'
              borderColor={selected === 4 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(4); set(100); }}
            >100 YOSK</Button>
            <Button w='full'
              borderColor={selected === 5 ? borderColor : 'transparent'}
              borderWidth={2}
              onClick={() => { setSelected(5); set(200); }}
            >200 YOSK</Button>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

export const LandingConnected: React.FunctionComponent<LandingStateProps> = (props) => {
  const toast = useToast();
  const { wallet, publicKey, signTransaction } = useWallet();
  const aWallet = useAnchorWallet();

  const [initBet, setInitBet] = React.useState(false);

  const endToEndBet = async (bet: boolean, amount: number) => {
    setInitBet(true);
    console.log('betting: ', bet, amount);

    if (!publicKey || !signTransaction || !aWallet) {
      toast({
        title: "Error",
        description: "Please connect to a wallet",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      setInitBet(false);
      return;
    }

    const program = await getProgram(CLUSTER, aWallet, publicKey);
    if (!program) {
      console.error('Could not connect to the program');
      return null;
    }

    const _connection = program.provider.connection;

    const { _bet_pda } = await getBetPda(program, publicKey);
    const { _config_pda } = await getConfigPda(program);
    const { _fee_pda } = await getFeePda(program);

    // call the smartcontract to initialize the bet, deposit, bet and finalize
    // all in one transaction
    const tx = new web3.Transaction();
    let _amount = amount * 1e9;
    const bn_amount = new anchor.BN(_amount);
    const bn_bet = new anchor.BN(bet ? 1 : 0);
    const bet_fee = _amount / 100 * 3;  // 3% fee
    const amount_to_transfer = (_amount + bet_fee);
    console.log(`amount_to_transfer: ${amount_to_transfer}`);

    // Create the bet account first
    tx.add(
      program.instruction.initiateBet(
        bn_amount,
        bn_bet,
        {
          accounts: {
            player: publicKey,
            betAccount: _bet_pda,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
          },
          signers: [],
        }
      )
    );

    // Then perform the bet transfer
    tx.add(
      web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: _bet_pda,
        lamports: amount_to_transfer
      })
    );

    // Then play
    console.log(`_bet_pda: ${_bet_pda}`);
    console.log(`_config_pda: ${_config_pda}`);

    tx.add(
      program.instruction.bet({
        accounts: {
          player: publicKey,
          feeWallet: FEE_WALLET,
          betAccount: _bet_pda,
          configAccount: _config_pda,
          feeAccount: _fee_pda,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [],
      })
    );

    // The player pay and sign the transaction
    tx.feePayer = publicKey;
    tx.recentBlockhash = (await _connection.getLatestBlockhash()).blockhash;

    let signedTx = null;
    try {
      signedTx = await signTransaction(tx);

    } catch (e) {
      console.error(e);
      setInitBet(false);
      return;
    }

    try {
      const txId = await _connection.sendRawTransaction(signedTx.serialize());
      await _connection.confirmTransaction(txId);

      setInitBet(false);
      props.triggerReload(t => !t);
      props.setStep('result');

      toast({
        title: "Success",
        description: "Bet finish",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

    } catch (e) {
      console.error(e);
      setInitBet(false);
      toast({
        title: "Error",
        description: "Failed to make bet",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const init = async () => {
      if (!publicKey) {
        return;
      }

    }

    init();
  }, [publicKey]);

  const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.900");

  return (
    <Box>
      <Flex justifyContent={'center'}>
        <VStack>
          <Box boxSize={'200px'}>
            <Image src='/coin.png' alt='coin' />
          </Box>

          <Box mb={16}>
            {
              publicKey
                ?
                <VStack spacing={4} padding={4} background={bgColor}>
                  <BetChoose choice={props.bet} set={props.setBet} />
                  <BetAmount amount={props.betAmount} set={props.setBetAmount} />

                  <Button
                    w='full'
                    colorScheme="green"
                    isLoading={initBet}
                    onClick={() => endToEndBet(props.bet, props.betAmount)}
                  >
                    Play Double or Nothing
                  </Button>
                </VStack>
                : <Wallet />
            }
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}