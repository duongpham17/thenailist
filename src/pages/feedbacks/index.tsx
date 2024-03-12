import Metadata from '@metadata';
import Feedbacks from 'routes/feedbacks';


const Index = () => {

  return (
    <>
      <Metadata 
        title="Feedbacks" 
        description="feedbacks, help us improve our customer services with your reviews and feedbacks." 
      />
      <Feedbacks />
    </>
  )
}

export default Index