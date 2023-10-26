import Metadata from '@metadata';
import Careers from 'routes/careers';
import api from '@database/api'
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
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
        props: {
          careers: []
        },
        revalidate: 60 * 60 * 24 * 1  // in days
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