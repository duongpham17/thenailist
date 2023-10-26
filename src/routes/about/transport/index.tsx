import styles from './Transport.module.scss';
import React from 'react';
import {data} from './data';

const Transport = () => {
  return (
    <div className={styles.container}>
        {data.map(el =>
            <div className={styles.element} key={el.id}>
                <p>{el.name}</p>
                <p>{el.description}</p>
            </div>    
        )}
    </div>
  )
}

export default Transport