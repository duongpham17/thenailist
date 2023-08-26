// NOTE using grid template column and using fr units will break the width of the slider!

import styles from './Swiper.module.scss';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md';

interface Props<T> {
    data: T[],
    children: (data: T, index: number) => React.ReactNode,
    slidersPerView?: number,
    arrows?: boolean
}

const SwiperContainer = <T,>({data, children, slidersPerView=5, arrows}: Props<T>) => {

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className={styles.container}>

           {arrows && data.length - 2 > 0 &&
                <div className={styles.navBtnLeft} >
                    <button ref={navigationPrevRef}><MdOutlineKeyboardArrowLeft/></button>
                </div>
            }

            {!!data.length && 
                <Swiper 
                    className={styles.swiper}
                    modules={[Navigation, Pagination]} 
                    spaceBetween={5} 
                    slidesPerView={slidersPerView} 
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }} 
                >

                    {data.map((element, index) => 
                        <SwiperSlide key={index}>
                            {children(element, index)}
                        </SwiperSlide>
                    )}

                </Swiper>
            }

            {arrows && data.length - 2 > 0 &&
                <div className={styles.navBtnRight} >
                    <button ref={navigationNextRef}><MdOutlineKeyboardArrowRight/></button>
                </div>
            }

        </div>
  )
}

export default SwiperContainer