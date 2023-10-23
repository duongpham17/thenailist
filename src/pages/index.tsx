import api from '@database/api'
import Metadata from '@metadata';
import Home from 'routes/home';;

import {INewsApi} from '@database/models/news';

export interface PropsTypes {
  news: INewsApi[] | []
}; 

export const getStaticProps = async () => {
  const res = await api.get('/news');

  return {
    props: {
      news: res.data.data || []
    },
    revalidate: 60 * 60 * 24 * 1  // in days
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