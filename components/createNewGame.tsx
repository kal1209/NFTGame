import React from 'react';
import {
  VStack,
  Box,
  StackDivider,
  Text,
  FlexProps,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  InputGroup,
  HStack,
  Button,
  Grid
} from '@chakra-ui/react';

import styles from '../styles/createNewGame.module.css';

export default function CreateNewGame() {
  return (
    <Box className={styles.content}>
      <VStack
        divider={<StackDivider />}
        align='stretch'
      >
        <SettingBox />
        <DescriptionBox />
      </VStack>
    </Box>
  );
}

interface SettingBoxProps extends FlexProps {
}
const SettingBox = ({ ...rest }: SettingBoxProps) => {
  return (
    <VStack
      p={7}
      align='stretch'
      spacing={4}
    >
      <Box>
        <Text>Game Length</Text>
        <NumberInput defaultValue={15} min={1} max={20} maxW='114px' maxH='44px' className={styles.input} >
          <NumberInputField className={styles.inputField} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box>
        <Text>How many rounds</Text>
        <NumberInput defaultValue={3} min={1} max={5} maxW='114px' maxH='44px' className={styles.input} >
          <NumberInputField className={styles.inputField} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box>
        <HStack>
          <Checkbox className={styles.checkbox}></Checkbox>
          <Text>Allow Crypto Bets</Text>
        </HStack>
      </Box>
      <Box>
        <Text>Game Password(Only for Private Games)</Text>
        <Grid
          templateColumns="repeat(12, 1fr)"
        >
          <InputGroup className={styles.input} gridColumn={{ base: 'span 12', lg: 'span 7' }}>
            <Input
              pr='4.5rem'
              type='password'
              className={styles.inputField}

            />
          </InputGroup>
        </Grid>
      </Box >
    </VStack >
  );
};

interface DescriptionBoxProps extends FlexProps {
}
const DescriptionBox = ({ ...rest }: DescriptionBoxProps) => {
  return (
    <Box>
      <VStack
        align='stretch'
        className={styles.descriptionPanel}
        my={3}
        mx={2}
      >
        <HStack p={3} px={10} className={styles.descriptionCheckboxSpan}>
          <Checkbox className={styles.descriptionCheckbox}></Checkbox>
          <Text className={styles.descriptionCheckboxText}>I accept all the terms & conditions</Text>
        </HStack>
        <Box>
          <Box
            overflowY="auto"
            className={styles.descriptionText}
            mr='27px'
            maxH="575px"
          >
            1. Acceptance of Terms: By accessing and playing FvF by Little Fokers, you agree to comply with and be bound by these terms and conditions. 2. Eligibility: Users must be of legal age to participate in crypto transactions in their jurisdiction. Users are responsible for ensuring compliance with local laws and regulations. 3. Account Registration: Users need to register an account to access certain features of the Game. Users are responsible for maintaining the confidentiality of their account information. 4. NFT Integration: Users may connect their NFT to the Game for personalized experiences. Ownership and transfer of NFTs are subject to the terms of the blockchain (e.g., Solana). 5. Gameplay: Users can engage in FvF battles, choosing players and maps. Private and public game options are available. Crypto bets may be placed, and outcomes are determined by in-game results. 6. User Conduct: Users agree not to engage in any activities that may disrupt or harm the Game or other users. Respect intellectual property rights; do not use unauthorized content. 7. Crypto Bets: Users acknowledge the risks associated with placing crypto bets. “Little Fokers” is not responsible for any financial losses incurred through crypto bets. 8. Privacy: User data is handled in accordance with our Privacy Policy. Anonymous gameplay data may be collected for analytics purposes. 9. Termination: Little Fokers reserves the right to terminate or suspend accounts for violations of these terms. 10. Changes to Terms: - Little Fokers may update these terms. Users will be notified, and continued use constitutes acceptance. 11. Disclaimers: - The Game is provided &quot;as is&quot; without warranties of any kind. - Little Fokers is not liable for losses, damages, or interruptions caused by unforeseen circumstances. 12. Governing Law: - These terms are governed by the laws of Jurisdiction. 13. Contact Information: - For questions or concerns, contact us on our discord or twitter.

          </Box>
        </Box>
      </VStack>
      <Button className={styles.createNewGameButton}>Create New Game</Button>
    </Box>
  );
};