import Metadata from '@metadata';
import Prices from 'routes/prices';
import api from '@database/api'
import {IPricesApi} from '@database/models/prices';

export interface PropsTypes {
  prices: IPricesApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/api/prices');

    return {
      props: {
        prices: res.data.data || []
      },
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    console.log(err);
    return {
      props: {
        prices: []
      },
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="Prices" 
        description="price list of acrylic, ombre, pedicure, eyelashes, nails, toes, waxing, design, art" 
      />
      <Prices {...props} />
    </>
  )
}

export default Index