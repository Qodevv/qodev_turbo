import '@radix-ui/themes/styles.css';
import type { AppProps } from "next/app";
import { Theme, Container } from '@radix-ui/themes'
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import '@radix-ui/themes/styles.css'
import '../styles/theme-config.css'


export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}
