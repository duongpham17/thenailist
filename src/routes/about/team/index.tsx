import styles from './Team.module.scss';
import React, {useState} from 'react';
import { PropsTypes } from 'pages/about';

import Cover from '@components/cover/Cover';
import Container from '@components/containers/Style1';

import {AiOutlineClose} from 'react-icons/ai';

const TeamIndex = (props: PropsTypes) => {

  const {teams} = props;

  const [selected, setSelected] = useState<null | typeof teams[0]>(null)

  return (
    <div className={styles.container} id="team">
      
      <h1>OUR TEAM</h1>

      <div className={styles.team}>
        {teams.map(el => 
          <div key={el._id} className={styles.element} onClick={() => setSelected(el)}>
            <img src={el.images[0]} alt={el.name} />
            <p>{el.name}</p>
          </div>  
        )}
      </div>

      {selected &&
        <Cover onClose={() => setSelected(null)}>
            <div className={styles.selected} onClick={e => e.stopPropagation()}>
              <button><AiOutlineClose/></button>
              <img src={selected.images[0]} alt="user"/>
              <b>{selected.name}</b>
              <p>{selected.description}</p>
            </div>
        </Cover>
      }



    </div>
  )
}

export default TeamIndex