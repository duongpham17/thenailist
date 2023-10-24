import styles from './Others.module.scss';
import React from 'react';
import { PropsTypes } from 'pages';
import Swiper from '@components/swiper';

import {BsShop} from 'react-icons/bs';

const Others = ({reviews}: PropsTypes) => {

  const images = ["home1.jpg", "home2.jpg", "home3.jpg", "home4.jpg"]

  return (
    <div className={styles.container}>

      <section className={styles.box1}>
        <div>
          <h1>What our clients are saying...</h1>
          <BsShop/>
        </div>
      </section>

      <section className={styles.box2}>
        <Swiper data={images} slidersPerView={1} arrows autoplay>
          {(el) => 
            <div key={el} className={styles.review}>
              <img src={el} alt={el}/>
            </div>
          }
        </Swiper>
      </section>

      <section className={styles.box3}>
        <Swiper data={reviews} slidersPerView={1} arrows autoplay>
          {(el) => 
            <div key={el._id} className={styles.review}>
                <b>{el.name}</b>
                <q> {el.review} </q>
            </div>
          }
        </Swiper>
      </section>
        
    </div>
  )
}

export default Others