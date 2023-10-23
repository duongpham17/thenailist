import React from 'react';
import { PropsTypes } from 'pages/about';

import Introduction from './introduction';
import Team from './team';
import Us from './us';
import Location from './location';

const AboutIndex = (props: PropsTypes) => {

  return (
    <div>

      <Introduction />

      <Team {...props} />

      <Us {...props} />

      <Location />
      
    </div>
  )
}

export default AboutIndex