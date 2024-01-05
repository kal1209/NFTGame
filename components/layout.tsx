import React, { ReactNode, ReactText } from 'react';
import {
  IconButton,
  Box,
  Grid,
  CloseButton,
  Flex,
  Link,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Text
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';

import ChooseNFT from '../components/chooseNFT';
import CreateNewGame from '../components/createNewGame';
import { Footer } from '../components/footer';

import styles from "../styles/layout.module.css";

interface LinkItemProps {
  name: string;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Create Game', href: "#" },
  { name: 'Past Game', href: "#" },
  { name: 'Feature Game', href: "#" },
  { name: 'Profile', href: "#" },
  { name: 'Leaderboard', href: "#" },
  { name: 'Guide', href: "#" },
  { name: 'Provably Fair', href: "#" },
];

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Grid
        templateColumns="repeat(12, 1fr)"
        minH="100vh"
      >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', lg: 'block' }}
          gridColumn={{ lg: 'span 3' }}
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
        <MobileNav onOpen={onOpen} display={{ base: 'none' }} />
        <Box
          gridColumn={{
            base: 'span 12', // Full width on base to md
            md: 'span 5', // 5 columns on lg
            lg: 'span 3' // 3 columns on xl
          }}
          paddingTop="35px"
          mx={{ lg: '0', md: '28px' }}
        >
          <ChooseNFT />
        </Box>
        <Box
          gridColumn={{
            base: 'span 12', // Full width on base to md
            md: 'span 7', // 7 columns on lg
            lg: 'span 6' // 6 columns on xl
          }}
          paddingTop="37px"
          mx={{ lg: '14px', md: '28px' }}
        >
          <CreateNewGame />
        </Box>
      </Grid>
      <Footer />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  return (
    <Box
      transition="3s ease"
      h="full"
      {...rest}>
      <Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box className={styles.sidebar} px={3}>
        <Image
          height='177.29px'
          width='159.02px'
          borderRadius={18}
          objectFit='cover'
          src='/logo.png'
          alt='Logo'
        />
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            href={link.href}
          >
            {link.name}
          </NavItem>
        ))
        }
      </Box>
    </Box >
  );
};

interface NavItemProps extends FlexProps {
  href: string;
  children: ReactText;
}
const NavItem = ({ href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        p={4}
      >
        <Text alignSelf="flex-start" className={styles.content} color="primary.50">
          {children}</Text>
      </Box>
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
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};