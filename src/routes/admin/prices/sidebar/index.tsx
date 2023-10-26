import styles from './Sidebar.module.scss';
import React from 'react';

import Actions from './actions';
import Items from './items';
import useWindow from '@hooks/useWindow';
import SlideIn from '@components/slidein/Style1';

const Sidebar = () => {

  const {width} = useWindow();

  return (width >= 700 
    ?
      <div className={styles.container}>
        <Actions />
        <Items />
      </div>
    :
      <div className={styles.small}>
        <Actions />
        <SlideIn icon={<button className={styles.button}>Select Item</button>} background="black">
          <Items />
        </SlideIn>
      </div>
  )
}

export default Sidebar