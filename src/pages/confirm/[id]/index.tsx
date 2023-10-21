import Metadata from '@metadata';
import Confirm from 'routes/confirm/[id]';

export default function Index() {
  return (
    <>
      <Metadata title="Authentication" />
      <Confirm />
    </>
  )
}