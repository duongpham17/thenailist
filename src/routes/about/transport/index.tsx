import styles from './Transport.module.scss';
import React from 'react';
import {data} from './data';
import useWindow from '@hooks/useWindow';
import Swiper from '@components/swiper';

const Transport = () => {

  const {width} = useWindow()

  return ( width >= 1000 ?
    <div className={styles.large}>
        {data.map(el =>
          <div className={styles.element} key={el.id}>
            <h2>{el.name}</h2>
            <p>{el.description}</p>
          </div>    
        )}
    </div>
    :
    <div className={styles.small}>
      <Swiper data={data} slidersPerView={1} arrows>
        {(el =>
          <div className={styles.element} key={el.id}>
            <h2>{el.name}</h2>
            <p>{el.description}</p>
          </div>    
        )}
      </Swiper>
    </div>
  )
}

export default Transport