import React from 'react';
import { PropsTypes } from 'pages';

import Introduction from './introdcution';
import Services from './services';
import News from './news';

const Index = (props: PropsTypes) => {

  return (
    <>

      <Introduction />

      <News {...props} />

      <Services />

    </>
  )
}

export default Index