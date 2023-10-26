import styles from './Gallery.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/styles';
import {instagram} from '@data/business';
import Instagram from '@components/instagram/Style1';
import Observer from '@components/observer/Observer';

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
                            />
                        )}
                    </div>
                </Observer>
            </div>
        :
        null
    )
}

export default Gallery