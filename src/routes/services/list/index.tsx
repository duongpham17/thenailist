import styles from './List.module.scss';
import React from 'react';
import Link from 'next/link';
import { PropsTypes } from 'pages/services';

const List = ({services}: PropsTypes) => {

  return (
    <div className={styles.container} id="what">

      <div className={styles.content}>

        <h1 className={styles.header}>WHAT WE DO</h1>

          {services?.map(el => 
              <div className={styles.element} key={el._id} id={el.name.toLowerCase()}>
                <h2>{el.name.toUpperCase()}</h2>
                {el.items.map(item => 
                  <div key={item._id} className={styles.item}>
                      <div className={styles.information}>
                        <b>{item.name}</b>
                        <p>{item.description}</p>
                      </div>
                      <div className={styles.images}>
                        <img src={item.images[0]} alt="THENAILST" />
                      </div> 
                  </div>
                )}
              </div>    
          )}

      </div>
        
    </div>
  )
}

export default List