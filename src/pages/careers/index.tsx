import Metadata from '@metadata';
import Careers from 'routes/careers';
import api from '@database/api';
import {all} from '@data/revalidate';
import {ICareersApi} from '@database/models/careers';

export interface PropsTypes {
  careers: ICareersApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/careers');

    return {
      props: {
        careers: res.data.data || []
      },
      revalidate: all // in days
    }
  } catch(err){
    return {
        props: {
          careers: []
        },
        revalidate: all // in days
      }
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="Careers" 
        description="careers, come join us, be part of the team" 
      />
      <Careers {...props} />
    </>
  )
}

export default Index