import Metadata from '@metadata';
import Services from 'routes/admin/services';

const Index = () => {
  return (
    <>
      <Metadata title="Admin Services" />
      <Services />
    </>
  )
}

export default Index