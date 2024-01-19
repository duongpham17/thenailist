import Metadata from '@metadata';
import Faq from 'routes/faq';
import api from '@database/api'
import {all} from '@data/revalidate';
import {IFaqApi} from '@database/models/faq';

export interface PropsTypes {
  faq: IFaqApi[] | []
}; 

export const getStaticProps = async () => {
  try{
    const res = await api.get('/faq');

    return {
      props: {
        faq: res.data.data || []
      },
      revalidate: all  // in days
    }
  } catch(err){
    return {
        props: {
          faq: []
        },
        // revalidate: all  // in days
      }
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="FAQ" 
        description="frequently asked questions" 
      />
      <Faq {...props} />
    </>
  )
}

export default Index