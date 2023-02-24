import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import AboutSiteFeatures from '@/features/AboutSiteFeatures'
import SpinnerFeatures from '@/features/SpinnerFeatures'
import GraphLayout from '@/features/GraphLayout'
import { useInitApp } from '@/functions/hooks/initApp'

export default function Home() {
  const isLoading = useInitApp()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ebf3ff',
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraphLayout />
          </div>
          <div
            style={{
              position: 'absolute',
              width: '100vw',
              height: '100vh',
            }}
          >
            <AboutSiteFeatures />
          </div>
          <div
            style={{
              position: 'absolute',
              zIndex: 100,
            }}
          >
            <SpinnerFeatures />
          </div>
        </div>
      </main>
    </>
  )
}
