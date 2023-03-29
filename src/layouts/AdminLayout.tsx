import { trpc } from '~/utils';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { Box, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { nanoid } from 'nanoid';
import { HomeHeader } from './HomeHeader';

const nav = [
  {
    label: 'Dashboard',
    links: [
      {
        text: 'Dashboard',
        link: '/admin/dashboard',
      },
    ],
  },
  {
    label: 'Branch',
    links: [
      {
        text: 'Branch list',
        link: '/admin/branch/list',
      },
      {
        text: 'Branch Staffs',
        link: '/admin/branch/staffs',
      },
    ],
  },
  {
    label: 'Parcels',
    links: [
      {
        text: 'Parcels',
        link: '/admin/parcels/list',
      },
    ],
  },
];

export function AdminLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const logoutMutation = trpc.user.logout.useMutation();

  // const handleSignOut = async () => {
  //   const { status } = await logoutMutation.mutateAsync();

  //   if (status) router.replace('/');
  // };

  return (
    <Box>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="3"
        p={{ sm: '0.4rem 1rem', base: '0.8rem 1rem' }}
        justifyContent="space-between"
        boxShadow="md"
      >
        <HomeHeader />
      </Box>
      <Flex as="main" justifyContent="center">
        <Grid
          maxW="container.xl"
          m="1rem"
          flex="1"
          templateColumns="repeat(8, 1fr)"
        >
          <GridItem
            colSpan={1}
            display="flex"
            flexDir="column"
            gap="2"
            flexShrink="0"
          >
            {nav.map(({ label, links }) => (
              <Flex flexDir="column" gap="2" key={nanoid()}>
                <Text color="cyan.600" fontWeight="bold">
                  {label}
                </Text>
                <Flex flexDir="column" gap="2">
                  {links.map(({ link, text }) => (
                    <Link as={NextLink} href={link} key={nanoid()}>
                      {text}
                    </Link>
                  ))}
                </Flex>
              </Flex>
            ))}
          </GridItem>
          <GridItem colSpan={7}>{children}</GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}
