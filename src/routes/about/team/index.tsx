import styles from './Team.module.scss';
import React from 'react';
import { PropsTypes } from 'pages/about';

const TeamIndex = (props: PropsTypes) => {

  const {teams} = props;

  return (
    <div className={styles.container} id="team">
      
      <h1>OUR TEAM</h1>

      <div className={styles.team}>
        {teams.map(el => 
          <div key={el._id} className={styles.element}>
            <img src={el.images[0]} alt={el.name} />
            <p>{el.name}</p>
          </div>  
        )}
      </div>


    </div>
  )
}

export default TeamIndex