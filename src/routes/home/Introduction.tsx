import styles from './Introduction.module.scss';
import React from 'react';
import Swiper from '@components/swiper';
import Link1 from '@components/link/Style1';

const Index = () => {

  const data = [
    {image: "/1.jpg"},
    {image: "/2.jpg"},
    {image: "/3.jpg"},
    {image: "/4.jpg"},
    {image: "/5.jpg"},
  ];

  return (
    <div className={styles.container}>

        <div className={styles.text}>
          <h1>Welcome to <br/> The Nailist </h1>
          <div className={styles.social}>
            <Link1 href="/" value="Book now" open />
          </div>
        </div>

        <Swiper data={data} slidersPerView={1} arrows autoplay>
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