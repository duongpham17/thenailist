import styles from './Introduction.module.scss';
import React from 'react';
import Swiper from '@components/swiper';

const Index = () => {

  const data = [
    {image: "/home/1.jpg"},
    {image: "/home/3.jpg"},
    {image: "/home/6.jpg"},
  ];

  return (
    <div className={styles.container}>
      <Swiper data={data} slidersPerView={1} arrows autoplay={10000}>
        {(el) => 
          <div key={el.image}>
            <img src={el.image} alt="home" />
          </div>
        }
      </Swiper>
    </div>
  )
}

export default Index