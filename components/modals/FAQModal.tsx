
/*
This is a confirmation modal
*/
import * as React from 'react';

import {
  Text,
  Flex,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  VStack,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue
} from '@chakra-ui/react';


export interface IConfirmModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;  
}


const Question: React.FC<{msg: string}> = ({msg}) => {
  return (
    <Box
      borderBottomWidth={'1px'}
      mt={16}
      mb={4}
    >
    <Text fontSize={'2xl'} letterSpacing={2}>
      {msg}
    </Text>
    </Box>
  )
}
  
export const FAQModal: React.FunctionComponent<IConfirmModal> = (props) => {
  return (
    <Modal 
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={['xl', '2xl']}
      isCentered
      scrollBehavior='inside'
    >
      <ModalOverlay 
        bg={'blackAlpha.500'}
        backdropFilter={'blur(10px) hue-rotate(90deg)'}
        overflowY={'auto'}
        borderColor={useColorModeValue('gray.800', 'gray.200')}
      />

      <ModalContent>
        <ModalHeader bg={useColorModeValue('gray.200', 'gray.800')} >
          Frequently Asked Questions</ModalHeader>
        <ModalCloseButton onClick={props.onClose}/>

        <ModalBody>
          <Question msg='What is Coin Flip (CF)?' />
          <Text>
            Coin Flip is a smart contract that allows users to play Double or Nothing with their
            Solana tokens. Odds are 50/50 with a 3.5% fee that goes to CF NFT holders.
          </Text>

          <Question msg='How do I know I can Trust CF?' />
          <VStack spacing={2} w='full' mr='auto'>
            <Text>CF has over +1m flips since we started and we are the #1 most trusted platform on Solana.</Text>
            <Text>The CF Team and CF NFT holders have aligned incentives for the game to have exactly 50/50 odds.</Text>
            <Text>Our House and Fee wallets are all public and every transaction can be reviewed by anyone.</Text>
          </VStack>

          <Question msg='Where can I track transactions?' />
          <VStack spacing={2} w='full' mr='auto'>
            <Text w='full'>House wallet: https://solscan.io/account/...</Text>
            <Text w='full'>Fee wallet: https://solscan.io/account/...</Text>
          </VStack>

          <Question msg='Where can I learn more?' />            
          <Text>
            Join us on discord, there will always be someone to help you out.
          </Text>
        </ModalBody>

        <ModalFooter bg={useColorModeValue('gray.200', 'gray.800')}  borderTopWidth={'1px'}>
          <Flex w='full'>
            <Button w='full' onClick={props.onClose}>GOT IT</Button>
          </Flex>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

  