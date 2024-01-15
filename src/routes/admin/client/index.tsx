import { useContext } from 'react';
import { Context } from '@context/useAuthentication';
import UseContext from './Context';
import Records from './records';

const AdminPricesIndex = () => {

  const {protect} = useContext(Context);

  protect(["admin"]);

  return (
    <UseContext>

        <Records/>
      
    </UseContext>
  )
}

export default AdminPricesIndex;