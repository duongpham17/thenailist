import Metadata from '@metadata';
import Reviews from 'routes/admin/reviews';

const Index = () => {
  return (
    <>
      <Metadata title="Admin Reviews" />
      <Reviews />
    </>
  )
}

export default Index