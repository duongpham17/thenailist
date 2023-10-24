import styles from './Links.module.scss';
import React from 'react'
import Link from 'next/link';

const Links = () => {
  return (
    <section className={styles.container}>
        <Link href="/faq">FAQ</Link>
        <Link href="/policy">PRIVACY POLICY</Link>
        <Link href="/terms">TERMS & CONDITIONS</Link>
    </section>
  )
}

export default Links