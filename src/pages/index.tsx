import api from '@database/api'
import Metadata from '@metadata';
import Home from 'routes/home';;

import {INewsApi} from '@database/models/news';
import {IReviewsApi} from '@database/models/reviews';

export interface PropsTypes {
  news: INewsApi[] | [],
  reviews: IReviewsApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const news = await api.get('/news');
    const reviews = await api.get('/reviews');
  
    return {
      props: {
        news: news.data.data || [],
        reviews: reviews.data.data || [],
      },
      //revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
      props: {
        news: [],
        reviews: [],
      },
      //revalidate: 60 * 60 * 24 * 1  // in days
    }
  }
};

export default function Index(props: PropsTypes) {
  return (
    <>
      <Metadata title="Home" />
      <Home {...props} />
    </>
  )
}