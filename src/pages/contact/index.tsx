import Metadata from '@metadata';
import Contact from 'routes/contact';

const Index = () => {
  return (
    <>
      <Metadata 
        title="Contact" 
        description="get in touch / contact us with any enquires or questions" 
      />
      <Contact />
    </>
  )
}

export default Index