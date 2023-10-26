import styles from './Gallery.module.scss';
import React, {useState, useEffect} from 'react';
import {PropsTypes} from 'pages/styles';
import {instagram} from '@data/business';
import { getInstagramMedia, InstgramMediaApi } from '@thirdparty/instagram';
import InstagramComponent from '@components/instagram/Style2';
import Observer from '@components/observer/Observer';
import Swiper from '@components/swiper';

const Gallery = ({gallery}: PropsTypes) => {

    const [dataInsta, setDataInsta] = useState<InstgramMediaApi[] | null>(null)

    useEffect(() => {
        (async () => {
            const data = await getInstagramMedia();
            setDataInsta(data);
        })()
    }, []);

    return ( gallery ?
            <div className={styles.container} id="gallery">
                <Observer>
                    <div className={styles.header}>
                        <h1>GALLERY</h1>
                    </div>

                   {dataInsta && 
                   <div className={styles.instagram}>
                        <InstagramComponent 
                            key={"10"} 
                            data={dataInsta} 
                            link={instagram} 
                            username="the_nailist_london"
                            likes={`999_999`}
                            text={`#nails #brows #beauty`} 
                            time={"1 minute ago"}
                        >
                            <Swiper data={dataInsta} slidersPerView={1} autoplay={5000} id={"123"}>
                                {(el, index) => 
                                    el.media_type === "VIDEO" 
                                    ? <video src={el.media_url} controls/>
                                    : <img key={index} src={el.media_url} alt="thenailist"/> 
                                    
                                }
                            </Swiper>
                        </InstagramComponent>
                    </div>
                    }
                </Observer>
            </div>
        :
        null
    )
}

export default Gallery