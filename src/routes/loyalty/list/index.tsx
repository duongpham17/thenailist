import styles from './List.module.scss';
import React from 'react';
import {data} from './data';

const ListIndex = () => {
  return (
    <div className={styles.container}>
        <h1>LOYALTY PROGRAMME</h1>
        {data.map((el, index) => 
            <div key={index}>
                <b>{el.question}</b>
                <p>{el.text}</p>
            </div>
        )}
    </div>
  )
}

export default ListIndex