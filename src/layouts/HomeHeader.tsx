import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  useColorMode,
  useBoolean,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { Logo } from './Logo';

export function HomeHeader() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, toggleOpen] = useBoolean();

  return (
    <Flex
      mx="auto"
      maxW="container.xl"
      as="nav"
      align="center"
      wrap="wrap"
      userSelect="none"
    >
      <Logo />
      <Box display={{ base: 'block', md: 'none' }} onClick={toggleOpen.toggle}>
        <HamburgerIcon />
      </Box>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
        flex="1"
      >
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          {/* <Search /> */}
          <Box
            as="div"
            display="flex"
            width={{ sm: 'initial', base: '100%' }}
            flexDirection={{ sm: 'row', base: 'column' }}
            // marginBottom={{ base: "2!important", sm: "0!important" }}
            gap="4"
          >
            <Button
              onClick={toggleColorMode}
              rightIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            >
              {colorMode === 'dark' ? 'Light' : 'Dark'}
            </Button>
            <Button>Log-in</Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
