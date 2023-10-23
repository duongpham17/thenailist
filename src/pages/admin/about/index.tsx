import Metadata from '@metadata';
import About from 'routes/admin/about';

const Index = () => {
  return (
    <>
      <Metadata title="Admin About" />
      <About />
    </>
  )
}

export default Index