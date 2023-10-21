import React from 'react';

import UseContextPrices from './Context';

import Actions from './actions';
import Create from './create';
import List from './list';
import Reorder from './reorder';

const AdminPricesIndex = () => {

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