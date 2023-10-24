import styles from './Footer.module.scss';
import React from 'react';
import useWindow from '@hooks/useWindow';
import Large from './Large';
import Small from './Small';
import Links from './Links';
import Copyright from './Copyright';

const Footer = () => {

  const {width} = useWindow();

  return ( 
    <div className={styles.container}> 

      { width >= 900 
        ? <Large />
        : <Small />
      }

      <Links />

      <Copyright/>
      
    </div>
  )
}

export default Footer