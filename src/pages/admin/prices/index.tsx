import Metadata from '@metadata';
import Prices from 'routes/admin/prices';

export default function Index() {
  return (
    <>
      <Metadata title="Prices" />
      <Prices />
    </>
  )
}