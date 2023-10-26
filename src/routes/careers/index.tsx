import styles from './Careers.module.scss';
import React from 'react';
import { PropsTypes } from 'pages/careers';

const CareersIndex = ({careers}: PropsTypes) => {
  return (
    <div className={styles.container}>

      <h1>Careers</h1>

      <div className={styles.careers}>
        {careers.map(el => 
          <div key={el._id}>
            <p>{el.message}</p>
          </div>
        )}
      </div>


    </div>
  )
}

export default CareersIndex