import React from 'react';
import { PropsTypes } from 'pages/careers';
import Introduction from './introduction';
import Message from './message';

const CareersIndex = (props: PropsTypes) => {
  return (
    <>

      <Introduction />

      <Message {...props} />

    </>
  )
}

export default CareersIndex