import {
  Button, Flex, HStack, Spacer,
  Text, useColorMode
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

import {
  getConnection
} from '../lib/utils';

import { useWallet } from '@solana/wallet-adapter-react';

// @ts-ignore
const CLUSTER = process.env.NEXT_PUBLIC_NODE_CLUSTER as string;


interface NavBarProps {
  reload: boolean,
  triggerReload: React.Dispatch<React.SetStateAction<boolean>>,
}


export const NavBar: React.FunctionComponent<NavBarProps> = ({ reload }) => {
  const [balance, setBalance] = useState<string>('NaN');
  const { publicKey, signTransaction, connected, disconnect } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();


  useEffect(() => {
    const init = async () => {
      if (!publicKey) {
        return;
      }

      const _connection = getConnection(CLUSTER);
      let _balance = await _connection.getBalance(publicKey);
      _balance = _balance / 1e9;
      setBalance(_balance.toString());
    }

    init();
  }, [balance, publicKey, reload]);

  return (
    <Flex direction={'column'}>
      <Flex h={'96px'} p={4}>
        <HStack spacing={4}>
          {/* <AiFillSound size={24} /> */}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <BsMoon /> : <BsSun />}
          </Button>
        </HStack>

        <Spacer />

        <HStack spacing={4}>
          <Button>RECENT</Button>
          <Button>TOP STREAKS</Button>
          <Button>STATS</Button>
        </HStack>
      </Flex>

      <Flex ml='auto' px={4}>
        <Text>{balance} SOL</Text>
      </Flex>
    </Flex>
  )
}  