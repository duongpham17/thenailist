import Metadata from '@metadata';
import Services from 'routes/services';
import api from '@database/api';
import {IServicesApi} from '@database/models/services';

export interface PropsTypes {
  services: IServicesApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/services');

    return {
      props: {
        services: res.data.data || []
      },
      //revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
      props: {
        services: []
      },
      //revalidate: 60 * 60 * 24 * 1  // in days
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