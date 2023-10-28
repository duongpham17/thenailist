import React from 'react';
import {PropsTypes} from 'pages/services';

import Introduction from './introduction';
import List from './list';
import Shapes from './shapes';

const ServicesIndex = (props: PropsTypes) => {
  return (
    <>
      <Introduction />

      <List {...props} />

      <Shapes />
    </>
  )
}

export default ServicesIndex