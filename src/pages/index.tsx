import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import AboutSiteFeatures from '@/features/AboutSiteFeatures'
import SpinnerFeatures from '@/features/SpinnerFeatures'
import GraphLayout from '@/features/GraphLayout'
import { getPrefList } from '../functions/api/getPrefList'
import { getPopulation } from '../functions/api/getPopulation'
import { useInitApp } from '@/functions/hooks/initApp'

export default function Home() {
  const isLoading = useInitApp()
  console.log('issssss', isLoading)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            backgroundColor: '#ebf3ff',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
          <div
            style={{
              paddingTop: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraphLayout />
          </div>
        </div>
      </main>
    </>
  )
}
