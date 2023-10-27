import React from 'react';
import { PropsTypes } from 'pages/about';

import Introduction from './introduction';
import Team from './team';
import Us from './us';
import Map from './map';
import Transport from './transport';

const AboutIndex = (props: PropsTypes) => {

  return (
    <div>

      <Introduction />

      <Team {...props} />

      <Us {...props} />

      <Transport />

      <Map />
      
    </div>
  )
}

export default AboutIndex