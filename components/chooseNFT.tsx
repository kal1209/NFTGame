import React, { } from 'react';
import {
  VStack,
  Box,
  Image,
  Text,
  Button,
} from '@chakra-ui/react';

import styles from '../styles/chooseNFT.module.css';

export default function ChooseNFT() {
  return (
    <VStack
      align='stretch'
      className={styles.chooseNFTColumns}
    >
      <Box>
        <Image
          boxSize='100%'
          src='/chooseNFT.png'
          alt='chooseNFT'
          className={styles.chooseNFT}
        />
      </Box>
      <Box>
        <Text className={styles.viewVerifiedCollection}>
          View verified collection
        </Text>
      </Box>
      <Box className={styles.stake}>
        <Text className={styles.text} color="primary.50">
          Stake/ Plot/ Floor Price
          xx.xx SOL
        </Text>
      </Box>
      <Button className={styles.confirmButton}>CONFIRM</Button>
    </VStack >
  );
}