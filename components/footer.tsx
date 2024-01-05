import {
  Flex, Box, Text
} from '@chakra-ui/react';


export const Footer: React.FunctionComponent = () => {
  return (
    <Flex
      as="footer"
      justifyContent="space-between"
      p="4"
      // position="fixed"
      left="0"
      bottom="0"
      right="0">
      <Box>
        {/* Content on the start side of the footer */}
        <Text>Powered by FOKERS</Text>
      </Box>
      <Box>
        {/* Content on the end side of the footer */}
        <Text>COPYRIGHT 2023, FOKERS NFT</Text>
      </Box>
    </Flex>
  )
}  