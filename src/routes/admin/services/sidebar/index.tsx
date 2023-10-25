import styles from './Sidebar.module.scss';
import React from 'react';

import Actions from './actions';
import Items from './items';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <Actions />
      <Items />
    </div>
  )
}

export default Sidebar