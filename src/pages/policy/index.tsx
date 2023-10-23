import Metadata from '@metadata';
import Policy from 'routes/policy';
import api from '@database/api'
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
      revalidate: 60 * 60 * 24 * 1  // in days
    }
  } catch(err){
    return {
        props: {
          policy: []
        },
        revalidate: 60 * 60 * 24 * 1  // in days
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