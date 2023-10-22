import styles from './Home.module.scss';
import React from 'react';

import Introduction from './Introduction';
import Services from './Services';

const Index = () => {

  return (
    <div className={styles.container}>

      <Introduction />

      <Services />

    </div>
  )
}

export default Index