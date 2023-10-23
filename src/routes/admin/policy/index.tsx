import { useContext } from 'react';
import { Context } from '@context/useAuthentication';
import UseContextPrices from './Context';
import Actions from './actions';
import Create from './create';
import List from './list';
import Reorder from './reorder';

const AdminPricesIndex = () => {

  const {protect} = useContext(Context);

  protect(["admin"]);

  return (
    <UseContextPrices>

      <Actions />

      <List />

      <Create />

      <Reorder />
      
    </UseContextPrices>
  )
}

export default AdminPricesIndex;