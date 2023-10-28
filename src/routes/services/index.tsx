import React from 'react';
import {PropsTypes} from 'pages/services';

import Introduction from './introduction';
import List from './list';

const ServicesIndex = (props: PropsTypes) => {
  return (
    <>
      <Introduction />

      <List {...props} />
    </>
  )
}

export default ServicesIndex