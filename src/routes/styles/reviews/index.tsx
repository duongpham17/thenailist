import styles from './Reviews.module.scss';
import { PropsTypes } from 'pages/styles';
import React from 'react'
import Swiper from '@components/swiper';
import useWindow from '@hooks/useWindow';

const Reviews = ({reviews}: PropsTypes) => {

    const {width} = useWindow()

    return ( reviews ?
            <div className={styles.container} id="reviews">

                <div className={styles.header}>
                    <h1>Reviews</h1>
                </div>

                <div className={styles.reviews}>
                    <Swiper data={reviews} slidersPerView={width >= 1000 ? 3 : width >= 600 ? 2 : 1} autoplay={10000} arrows id={"1"}>
                    {(el) => 
                        <div className={styles.review}>
                            <h3>{el.name}</h3>
                            <p>{el.review}</p>
                        </div>
                    }
                    </Swiper>    
                </div>
            </div>
        : 
        <div></div>
    )
}

export default Reviews