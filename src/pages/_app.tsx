import 'styles/global.scss';
import styles from './_app.module.scss';
import type { AppProps } from 'next/app';

import Constant from 'layout/navbar';
import Footer from 'layout/footer';

import progress from '@misc/progress';

import { Poppins } from 'next/font/google';

const font = Poppins({subsets: ["latin"], weight: ["400", "200"]})

progress();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Constant />
      <div className={styles.container}> 
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  )
}
