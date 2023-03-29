import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { trpc } from '~/utils';
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import { theme } from '~/config';

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          typeof pageProps.cookies === 'string'
            ? cookieStorageManagerSSR(pageProps.cookies)
            : localStorageManager
        }
      >
        <NextNProgress />
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default trpc.withTRPC(App);
