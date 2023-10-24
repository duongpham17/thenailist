import styles from './List.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/services';

const List = ({services}: PropsTypes) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {services?.map(el =>
          <div key={el._id} className={styles.element} id={el.href}>
            <img src={el.images[0]} alt={el.name}/>
            <b>{el.name.toUpperCase()}</b>
            <p>{el.description}</p>
          </div>  
        )}
      </div>
    </div>
  )
}

export default List