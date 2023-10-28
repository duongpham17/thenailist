import styles from './Introduction.module.scss';
import React from 'react';

const Introduction = () => {
  return (
    <div className={styles.container} id="loyalty">
        <div className={styles.content}>
            <h1>Loyalty</h1>
            <span/>
            <p>
              Here are a few things that we thought you would like to know about us here at.
            </p>
        </div>
    </div>
  )
}

export default Introduction