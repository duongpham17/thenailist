import 'styles/global.scss';
import styles from './_app.module.scss';
import type { AppProps } from 'next/app';
import Navbar from 'layout/navbar';
import Footer from 'layout/footer';
import Helper from 'layout/helper';
import Loading from 'layout/loading';
import UseAuthentication from '@context/useAuthentication';
import progress from '@misc/progress';
import { Source_Sans_Pro } from 'next/font/google';

const font = Source_Sans_Pro({subsets: ["latin"], weight: ["200", "400"]})
progress();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseAuthentication>
        <main className={font.className}>
          <Loading/>
          <Navbar />
          <div className={styles.container}> 
            <Component {...pageProps} />
          </div>
          <Helper />
          <Footer />
        </main>
    </UseAuthentication>
  )
}
