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
} from '@chakra-ui/react';
import { Wallet } from './wallet';

import { LandingConnected } from './landing_connected';
import { LandingResult } from './landing_result';
import { LandingNotConnected } from './landing_not_connected';

import { useWallet } from '@solana/wallet-adapter-react';


export interface LandingProps {
  reload: boolean,
  triggerReload: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface LandingStateProps extends LandingProps {
  step: "not_connected" | "connected" | 'result';
  setStep: React.Dispatch<React.SetStateAction<"not_connected" | "connected" | 'result'>>;

  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  bet: boolean;
  setBet: React.Dispatch<React.SetStateAction<boolean>>;
}


const Landing: React.FunctionComponent<LandingProps> = (props) => {
  const [step, setStep] = React.useState<"not_connected" | "connected" | 'result'>("not_connected");
  const [betAmount, setBetAmount] = React.useState(0);
  const [bet, setBet] = React.useState(true);

  const stepProps = {
    reload: props.reload,
    triggerReload: props.triggerReload,
    step,
    setStep,
    betAmount,
    setBetAmount,
    bet,
    setBet,
  }

  const { wallet, publicKey, signTransaction, connected, disconnect } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setStep("connected");
    }
  }, [publicKey]);

  return (
    <Flex justifyContent={'center'}>
      <VStack spacing={8}>
        <Box mb={16} mx='auto'>
          {(step === "not_connected") && <LandingNotConnected {...stepProps}/>}
          {(step === "connected") && <LandingConnected {...stepProps}/>}
          {(step === "result") && <LandingResult {...stepProps}/>}
        </Box>
      </VStack>
    </Flex>
  )
}

export default Landing;