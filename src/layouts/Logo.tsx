import { Box, Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Box display="flex" flexDirection="column" lineHeight="1">
      <Text
        as="h1"
        fontSize={{ sm: '3xl', base: '2xl' }}
        fontWeight="semibold"
        color="cyan.600"
      >
        Pasabay
      </Text>
      <Text
        as="h1"
        // fontSize={{ sm: '4xl', base: '2xl' }}
        fontWeight="semibold"
      >
        Pickup and Drop System
      </Text>
    </Box>
  );
}
