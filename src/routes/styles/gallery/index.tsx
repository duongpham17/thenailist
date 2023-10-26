import styles from './Gallery.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/styles';
import {instagram} from '@data/business';
import Instagram from '@components/instagram/Style2';
import Observer from '@components/observer/Observer';
import Swiper from '@components/swiper';
import { generateid } from '@utils/function';

const Gallery = ({gallery}: PropsTypes) => {

    return ( gallery ?
            <div className={styles.container} id="gallery">
                <Observer>
                    <div className={styles.header}>
                        <h1>GALLERY</h1>
                    </div>

                    <div className={styles.instagram}>
                        {gallery.map((el) => 
                            <Instagram 
                                key={el._id} 
                                images={el.src} 
                                link={instagram} 
                                username="the_nailist"
                                likes={`${100+el.src.length}`}
                                text={`#${el.name.toLowerCase()} #brows #nails #beauty`} 
                            >
                                <Swiper data={el.src} slidersPerView={1} autoplay={5000} id={el._id}>
                                    {(src, index) => <img key={index} src={src} alt="thenailist"/> }
                                </Swiper>
                            </Instagram>
                        )}
                    </div>
                </Observer>
            </div>
        :
        null
    )
}

export default Gallery