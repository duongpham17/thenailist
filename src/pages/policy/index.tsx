import Metadata from '@metadata';
import Policy from 'routes/policy';
import api from '@database/api';
import {all} from '@data/revalidate';
import {IPolicyApi} from '@database/models/policy';

export interface PropsTypes {
  policy: IPolicyApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/policy');

    return {
      props: {
        policy: res.data.data || []
      },
      revalidate: all // in days
    }
  } catch(err){
    return {
        props: {
          policy: []
        },
        //revalidate: all // in days
      }
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="Policy" 
        description="privacy policy" 
      />
      <Policy {...props} />
    </>
  )
}

export default Index