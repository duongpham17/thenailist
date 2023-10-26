import styles from './Reviews.module.scss';
import { PropsTypes } from 'pages/styles';
import React, {useMemo} from 'react'
import Swiper from '@components/swiper';
import useWindow from '@hooks/useWindow';
import { generateid } from '@utils/function';

const Reviews = ({reviews}: PropsTypes) => {

    const {width} = useWindow();

    const newReviews = useMemo(() => {
        const chunkedArray = [];
        for (let i = 0; i < reviews.length; i += 3) {
          chunkedArray.push(reviews.slice(i, i + 3));
        };
        return chunkedArray;
    }, [reviews]);

    return ( newReviews ?
            <div className={styles.container} id="reviews">

                <div className={styles.header}>
                    <h1>WHAT OUR CLIENT SAYS</h1>
                </div>

                <div className={styles.reviews}>
                    <Swiper data={newReviews} slidersPerView={width >= 1000 ? 3 : width >= 600 ? 2 : 1} autoplay={5000} arrows id={"1"}>
                    {(el) => 
                        <div className={styles.child} key={generateid()}>
                            {el.map(c =>
                                <div className={styles.review} key={c._id}>
                                    <h3>{c.name}</h3>
                                    <p>{c.review}</p>
                                </div>    
                            )}
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