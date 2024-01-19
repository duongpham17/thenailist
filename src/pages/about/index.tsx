import Metadata from '@metadata';
import About from 'routes/about';
import api from '@database/api'
import {all} from '@data/revalidate';
import {IAboutApi} from '@database/models/about';
import {ITeamsApi} from '@database/models/teams';

export interface PropsTypes {
  about: IAboutApi[] | [],
  teams: ITeamsApi[] | [] 
}; 

export const getStaticProps = async () => {
  try{
  const about = await api.get('/about');
  const teams = await api.get('/teams');

  return {
    props: {
      about: about.data.data || [],
      teams: teams.data.data || []
    },
    revalidate: all // in days
  } 
  } catch(err){
    return {
      props: {
        about: [],
        teams: []
      },
      // revalidate: 60 * 60 * 24 * 1  // in days
    } 
  }
};

const Index = (props: PropsTypes) => {

  return (
    <>
      <Metadata 
        title="About" 
        description="about us, help, location, time, and more" 
      />
      <About {...props} />
    </>
  )
}

export default Index