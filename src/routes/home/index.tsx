import React from 'react';
import { PropsTypes } from 'pages';

import Introduction from './introdcution';
import News from './news';
import Others from './others';

const Index = (props: PropsTypes) => {

  return (
    <>

      <Introduction />

      <News {...props} />

      <Others {...props} />

    </>
  )
}

export default Index