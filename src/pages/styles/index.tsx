import Metadata from '@metadata';
import Styles from 'routes/styles';
import api from '@database/api'
import {IGalleryApi} from '@database/models/gallery';
import {IReviewsApi} from '@database/models/reviews';

export interface PropsTypes {
  gallery: IGalleryApi[] | [],
  reviews: IReviewsApi[] | [],
}; 

export const getStaticProps = async () => {
  try{
    const gallery = await api.get('/gallery');
    const reviews = await api.get('/reviews');

    return {
      props: {
        gallery: gallery.data.data || [],
        reviews: reviews.data.data || [],
      },
      //revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
      props: {
        gallery: [],
        reviews: [],
      },
    }
  }
};


const StylesIndex = (props: PropsTypes) => {
  return (
    <>
      <Metadata 
        title="Styles" 
        description="check out our styles, gallery, reviews and more..." 
      />
      <Styles {...props} />
    </>
  )
}

export default StylesIndex