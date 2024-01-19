import Metadata from '@metadata';
import Terms from 'routes/terms';
import api from '@database/api';
import {all} from '@data/revalidate';
import {ITermsApi} from '@database/models/terms';

export interface PropsTypes {
  terms: ITermsApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/terms');

    return {
      props: {
        terms: res.data.data || []
      },
      revalidate: all  // in days
    }
  } catch(err){
    return {
        props: {
          terms: []
        },
        revalidate: all  // in days
      }
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="Terms" 
        description="terms and conditons" 
      />
      <Terms {...props} />
    </>
  )
}

export default Index