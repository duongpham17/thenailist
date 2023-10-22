import React from 'react';
import useWindow from '@hooks/useWindow';
import Large from './Large';
import Small from './Small';

const Footer = () => {

  const {width} = useWindow();

  return ( width >= 900 ?
    <Large />
    :
    <Small />
  )
}

export default Footer