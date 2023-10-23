import 'styles/global.scss';
import styles from './_app.module.scss';
import type { AppProps } from 'next/app';
import Constant from 'layout/navbar';
import Footer from 'layout/footer';
import Helper from 'layout/helper';
import UseAuthentication from '@context/useAuthentication';
import progress from '@misc/progress';
import { Lato } from 'next/font/google';

const font = Lato({subsets: ["latin"], weight: ["300","400"]})
progress();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseAuthentication>
      <main className={font.className}>
        <Constant />
        <div className={styles.container}> 
          <Component {...pageProps} />
        </div>
        <Helper />
        <Footer />
      </main>
    </UseAuthentication>
  )
}
