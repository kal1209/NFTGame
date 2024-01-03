import React, { ReactNode, ReactText } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Container,
  Divider,
  Stack,
  Button,
  useColorMode,
  Hide,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import { BsCoin, BsGlobe, BsMoon, BsSun, BsTwitter } from "react-icons/bs";
import { IoRocket } from "react-icons/io5";
import {
  MdLeaderboard,
  MdQueryStats
} from "react-icons/md";
import { FaDiscord, FaSkull } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { IconType } from 'react-icons';

import { Wallet } from '../components/wallet';
import styles from "../styles/Home.module.css";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Token Flip', icon: BsCoin, href: "#" },
  // { name: 'Top Streaks', icon: IoRocket },
  // { name: 'Leaderboard', icon: MdLeaderboard },
  // { name: 'Stats', icon: MdQueryStats },
  { name: 'Stake', icon: FaSkull, href: "https://stake.diamondvaults.io/vault/yoskulls" },
  { name: 'Raffle', icon: GiTicket, href: "https://www.diamondvaults.io/projects/tLWq2idXs66i679iuYWE" },
];

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" className={styles.mainContainer}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        minHeight="calc(100vh - 80px)"
        padding="5"
        pos="relative"
        display="flex"
        justifyContent="center"
        alignItems="center">
        {children}
        <SmallCentered />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          height='50px'
          objectFit='cover'
          src='/logo.png'
          alt='Logo'
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          {...(link.href == "#" ? {
            bg: 'cyan.400',
            color: 'white'
          } : {})}
        >
          {link.name}
        </NavItem>
      ))
      }
      <VStack spacing={'2'} pos="absolute" bottom="3" left="2">
        <Text>Solana Network: 1234 TPS</Text>
        <Divider />
        <VStack spacing={'1'}>
          <HStack spacing={'1'}>
            <Link href='https://twitter.com/YoSkulls' target="_blank" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Button leftIcon={<BsTwitter />} variant='outline'>
                Twitter
              </Button>
            </Link>
            <Link href='https://discord.gg/YoSkulls' target="_blank" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Button leftIcon={<FaDiscord />} variant='outline'>
                Discord
              </Button>
            </Link>
          </HStack>
          <HStack spacing={'1'}>
            <Link href='https://www.magiceden.io/marketplace/yoskulls' target="_blank" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Button leftIcon={<Image src={colorMode == "light" ? "/black_me.png" : "/light_me.png"} width="4" />} variant='outline'>
                Market
              </Button>
            </Link>
            <Link href='https://yoskulls.com' target="_blank" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
              <Button leftIcon={<BsGlobe />} variant='outline'>
                Website
              </Button>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </Box >
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} isExternal={href !== "#"}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Wallet />
      </HStack>
    </Flex>
  );
};

const SmallCentered = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      width="100%"
      pos="absolute"
      bottom="0"
      left="0">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Hide below="md">
          <Stack direction={'row'} spacing={6}>
            <Link href={'#'}>ABOUT</Link>
            <Link href={'#'}>FAQ</Link>
            <Link href={'#'}>HOW TO PLAY</Link>
            <Link href={'#'}>FLIP RESPONSIBILTY</Link>
          </Stack>
        </Hide>
        <Hide above="md">
          <Stack direction={'column'} spacing={6}>
            <Link href={'#'}>&nbsp;</Link>
          </Stack>
        </Hide>
      </Container>
      <Button onClick={toggleColorMode} pos="absolute" right="3" bottom="2">
        {colorMode === 'light' ? <BsMoon /> : <BsSun />}
      </Button>
    </Box>
  );
};