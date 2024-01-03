import {
  Flex, Link, HStack, Spacer,
  Text, useColorModeValue, useDisclosure
} from '@chakra-ui/react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { SiDiscord } from 'react-icons/si';
import { FAQModal } from './modals/FAQModal';
import { FAQHowToPlay } from './modals/FAQHowToPlay';
import { ModalFlipResponsability } from './modals/ModalFlipResponsability';


export const Footer: React.FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenHTP, onOpen: onOpenHTP, onClose: onCloseHTP } = useDisclosure();
  const { isOpen: isOpenFR, onOpen: onOpenFR, onClose: onCloseFR } = useDisclosure();

  return (
    <Flex h={'48px'} p={4}
      position={'fixed'}
      left={0}
      right={0}
      bottom={0}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <HStack spacing={4}>
        <AiOutlineTwitter size={32} />
        <SiDiscord size={32} />
      </HStack>

      <Spacer />

      <HStack spacing={4}>
        <Link textDecoration={'underline'}>ABOUT</Link>
        <Link textDecoration={'underline'} onClick={onOpen}>FAQ</Link>
        <Link textDecoration={'underline'} onClick={onOpenHTP}>HOW TO PLAY</Link>
        <Link textDecoration={'underline'} onClick={onOpenFR}>FLIP RESPONSABILITY</Link>
      </HStack>

      <Spacer />

      <HStack spacing={4}>
        <Text>
          Solana Network: 1234 TPS
        </Text>
      </HStack>

      <FAQModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />

      <FAQHowToPlay
        isOpen={isOpenHTP}
        onOpen={onOpenHTP}
        onClose={onCloseHTP}
      />

      <ModalFlipResponsability
        isOpen={isOpenFR}
        onOpen={onOpenFR}
        onClose={onCloseFR}
      />

    </Flex>
  )
}  