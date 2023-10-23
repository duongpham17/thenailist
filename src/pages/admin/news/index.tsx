import Metadata from '@metadata';
import News from 'routes/admin/news';

const Index = () => {
  return (
    <>
      <Metadata title="Admin News" />
      <News />
    </>
  )
}

export default Index