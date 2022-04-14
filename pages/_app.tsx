import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, AppShell } from '@mantine/core'
import { Navbar } from '../components/navbar'

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'dark' }}>
    <AppShell padding="md" navbar={<Navbar/>}>
      <Component {...pageProps} />
    </AppShell>
  </MantineProvider>
}

export default MyApp
