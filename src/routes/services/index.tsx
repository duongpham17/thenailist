import React from 'react';
import {PropsTypes} from 'pages/services';

import Introduction from './introduction';
import List from './list';
import Prices from './prices';

const ServicesIndex = (props: PropsTypes) => {
  return (
    <>
      <Introduction />

      <List {...props} />

      <Prices {...props} />
    </>
  )
}

export default ServicesIndex