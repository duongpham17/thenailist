import styles from './Footer.module.scss';
import React from 'react';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <small>@ 2023, thenailist.co.uk</small>
      </div>
      <div className={styles.right}>
        <small>17 Example Road, Somewhere, LN19 8DS : Location</small>
        <small>Example.test@gmail.com : Email</small>
        <small>000 1212 5151 : Telephone</small>
      </div>
    </div>
  )
}

export default Footer