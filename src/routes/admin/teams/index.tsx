import { useContext } from 'react';
import { Context } from '@context/useAuthentication';
import UseContext from './Context';
import Actions from './actions';
import List from './list';
import Reorder from './reorder';

const AdminPricesIndex = () => {

  const {protect} = useContext(Context);

  protect(["admin"]);

  return (
    <UseContext>

      <Actions />

      <List />

      <Reorder />
      
    </UseContext>
  )
}

export default AdminPricesIndex;