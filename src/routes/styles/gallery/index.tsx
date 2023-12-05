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
                        {gallery.map(el => 
                            <Instagram 
                                key={el._id} 
                                images={el.src} 
                                icon={"/favicon.ico"}
                                link={instagram} 
                                username="thenailist_london"
                                likes={`999,999`}
                                text={`#${el.name} #Nails #Brows #Beauty`} 
                                time={`${el.src.length + 1} minute ago`}
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