
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
  HStack,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue
} from '@chakra-ui/react';


export interface IConfirmModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


const Question: React.FC<{ msg: string }> = ({ msg }) => {
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

const ListItem: React.FC<{ nb: number, msg: string }> = ({ nb, msg }) => {
  return (
    <HStack>
      <Text>{nb.toString()}.</Text>
      <Text>{msg}</Text>
    </HStack>
  )
}

export const ModalFlipResponsability: React.FunctionComponent<IConfirmModal> = (props) => {
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
          Flip Responsibly</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />

        <ModalBody>
          <ListItem nb={1} msg={'Connect your Solana Wallet.'} />
          <ListItem nb={2} msg={'Pick either heads or tails.'} />
          <ListItem nb={3} msg={'Select your desired flip amount.'} />
          <ListItem nb={4} msg={'Click “Double or Nothing”.'} />
          <ListItem nb={5} msg={'Click approve and wait for coin to spin'} />
          <ListItem nb={6} msg={'Congrats, you’re have done your first flip'} />

          <Question msg='RESOURCES' />
          <VStack w='full' mr='auto'>
            <Text w='full'>Call 1-800-522-4700</Text>
            <Text w='full'>Chat ncpgambling.org/chat</Text>
            <Text w='full'>Text 1-800-522-4700</Text>
          </VStack>

          <Question msg='DO I HAVE A FLIPPING PROBLEM?' />
          <Text>
          Flipping problem includes all behavior patterns that compromise, disrupt, 
          or damage any personal, family, or vocational pursuits. Symptoms include increasing 
          preoccupation with flipping, a need to flip more and more frequently, restlessness 
          or irritability when attempting to stop, “chasing” losses, and loss of control 
          manifested by continuation of the flipping behavior in spite of mounting, 
          serious, and/or negative consequence.
          </Text>
        </ModalBody>

        <ModalFooter bg={useColorModeValue('gray.200', 'gray.800')} borderTopWidth={'1px'}>
          <Flex w='full'>
            <Button w='full' onClick={props.onClose}>GOT IT</Button>
          </Flex>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

