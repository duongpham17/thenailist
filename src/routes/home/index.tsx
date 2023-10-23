import React from 'react';
import { PropsTypes } from 'pages';

import Introduction from './Introduction';
import Services from './Services';
import News from './News';

const Index = (props: PropsTypes) => {

  return (
    <>

      <Introduction />

      <Services />

      <News {...props} />

    </>
  )
}

export default Index