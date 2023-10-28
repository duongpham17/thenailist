import styles from './Message.module.scss';
import React from 'react';
import { PropsTypes } from 'pages/careers';

const Message = ({careers}: PropsTypes) => {
  return (
    <div className={styles.container}>
        <h1>JOIN US</h1>
        {careers.map(el => 
            <div key={el._id}>
                <p>{el.message}</p>
            </div>
        )}
    </div>
  )
}

export default Message