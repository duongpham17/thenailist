import React from 'react';
import { PropsTypes } from 'pages/about';

import Team from './team';
import Us from './us';

const AboutIndex = (props: PropsTypes) => {

  return (
    <div>

        <Team {...props} />

        <Us {...props} />
        
    </div>
  )
}

export default AboutIndex