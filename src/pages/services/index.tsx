import Metadata from '@metadata';
import Services from 'routes/services';
import api from '@database/api';
import { IServicesApi } from '@database/models/services';
import { IPricesApi } from '@database/models/prices';

export interface PropsTypes {
  services: IServicesApi[] | [],
  prices: IPricesApi[] | [],
}; 

export const getStaticProps = async () => {
  try{
    const services = await api.get('/services');
    const prices = await api.get('/prices');

    return {
      props: {
        services: services.data.data || [],
        prices: prices.data.data || []
      },
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
      props: {
        services: [],
        prices: [],
      },
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  }
};

const Index = (props: PropsTypes) => {
  return (
    <>
      <Metadata 
        title="Services" 
        description="services acrylic, ombre, pedicure, eyelashes, nails, toes, waxing, design, art" 
      />
      <Services {...props} />
    </>
  )
}

export default Index