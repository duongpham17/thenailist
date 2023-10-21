import styles from './Swiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from 'react-icons/md';

interface Props<T> {
    data: T[],
    children: (data: T, index: number) => React.ReactNode,
    slidersPerView?: number,
    arrows?: boolean,
    autoplay?: boolean,
}

const SwiperContainer = <T,>({data, children, slidersPerView=5, arrows, autoplay}: Props<T>) => {

    return (
        <div className={styles.container}>

           {arrows && data.length - 2 > 0 &&
                <div className={styles.navBtnLeft}>
                    <button className='prev'><MdOutlineKeyboardArrowLeft/></button>
                </div>
            }

            {!!data.length && 
                <Swiper 
                    className={styles.swiper}
                    modules={[Navigation, Pagination, Autoplay]} 
                    spaceBetween={5} 
                    autoplay={autoplay ? {} : {delay: 5000}}
                    slidesPerView={slidersPerView} 
                    navigation={{
                        prevEl: ".prev",
                        nextEl: ".next",
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
                    <button className='next'><MdOutlineKeyboardArrowRight/></button>
                </div>
            }

        </div>
  )
}

export default SwiperContainer