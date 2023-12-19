import styles from './Transport.module.scss';
import React from 'react';
import {data} from './data';

const Transport = () => {

  return (
    <div className={styles.container} id="location">
        <h1>GETTING HERE</h1>
        <div className={styles.transport}>
          {data.map(el =>
            <div className={styles.element} key={el.id}>
              <h2>{el.name}</h2>
              <p>{el.description}</p>
            </div>    
          )}
        </div>
    </div>
  )
}

export default Transport